using AspenMobile.GlobalConstants;
using IdentityModel.OidcClient;
using IdentityModel.OidcClient.Browser;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;


namespace AspenMobile.ViewModels
{
    //Made from Jonathan's template https://github.com/snow-jallen/Authorized.git
    public partial class LoginViewModel : ObservableObject
    {

        public LoginViewModel()
        {
            //Title = "Aspen Login!";

            var browser = DependencyService.Get<IBrowser>();
            var options = new OidcClientOptions
            {
                Authority = "https://engineering.snow.edu/aspen/auth/realms/aspen",
                ClientId = "aspen-web",
                Scope = "profile email api-use",
                RedirectUri = "xamarinformsclients://callback",
                PostLogoutRedirectUri = "xamarinformsclients://callback",
                Browser = browser

            };

            client = new OidcClient(options);
            _apiClient.Value.BaseAddress = new Uri("https://engineering.snow.edu/aspen/");
        }


        public OidcClient client;
        public LoginResult _result;
        public Lazy<HttpClient> _apiClient = new Lazy<HttpClient>(() => new HttpClient());
        public string accessToken;

        [ObservableProperty]
        public string loginStatus;
        [ObservableProperty]
        public string title;
        [ObservableProperty]
        private string outputText;

        [ObservableProperty, AlsoNotifyChangeFor(nameof(CanLogOut))]
        private bool canLogIn;
        public bool CanLogOut => !CanLogIn;

        [ObservableProperty]
        public bool isAdmin;

        [ObservableProperty]
        public string userName;

        [ICommand]
        private async Task Logout()
        {
            SecureStorage.Remove(Constants.AccessToken);
            try
            {
                await client.LogoutAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
            CanLogIn = true;
            IsAdmin = false;
            LoginStatus = "Log In";
            UserName = null;
        }


        [ICommand]
        private async Task Login()
        {
            try
            {
                accessToken = await SecureStorage.GetAsync(Constants.AccessToken);
                if (accessToken == null)
                {
                    _result = await client.LoginAsync(new LoginRequest());

                    if (_result.IsError)
                    {
                        OutputText = _result.Error;
                        return;
                    }
                    accessToken = _result.AccessToken;

                    await SecureStorage.SetAsync(Constants.AccessToken, accessToken);
                    IsAdmin = IsTokenAdmin(accessToken);
                    await SetUserNameFromToken();

                }

                CanLogIn = false;
                LoginStatus = "Log Out " + UserName;
                if (_apiClient.Value.DefaultRequestHeaders.Authorization == null)
                {
                    _apiClient.Value.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken ?? "");
                }
            }
            catch (Exception ex)
            {
                //OutputText = ex.ToString();
            }
        }
        private bool IsTokenAdmin(string jwt)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(jwt);
            var realm_access = jwtSecurityToken.Claims.Single(c => c.Type == "realm_access").Value;
            using var doc = JsonDocument.Parse(realm_access);
            var roles = doc.RootElement.GetProperty("roles");
            IsAdmin = roles.EnumerateArray().Any(i => i.GetString() == "admin-aspen");
            return IsAdmin;
        }
        public async Task CheckTokenIsLiveAsync()
        {
            accessToken = await SecureStorage.GetAsync(Constants.AccessToken);
            if (accessToken != null)
            {
                var handler = new JwtSecurityTokenHandler();
                var jwtSecurityToken = handler.ReadJwtToken(accessToken);
                if ((jwtSecurityToken.ValidTo - DateTime.Now.ToUniversalTime()) > TimeSpan.Zero)
                {
                    IsAdmin = IsTokenAdmin(accessToken);
                    await SetUserNameFromToken();
                    LoginStatus = "Log Out " + UserName;
                }
                else
                {
                    await Logout();
                }
            }
            else
            {
                await Logout();
            }
        }
        private async Task SetUserNameFromToken()
        {
            accessToken = await SecureStorage.GetAsync(Constants.AccessToken);
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(accessToken);
            UserName = jwtSecurityToken.Claims.Single(c => c.Type == "preferred_username").Value;

        }
        public async Task ToggleLoginLogout()
        {
            if(LoginStatus == "Log In")
            {
                Login();
            }
            else
            {
                Logout();
            }
        }
    }
}