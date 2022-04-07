using IdentityModel.OidcClient;
using IdentityModel.OidcClient.Browser;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;


namespace AspenMobile.ViewModels
{
    //Made from Johnthan's template https://github.com/snow-jallen/Authorized.git
    public partial class LoginViewModel : ObservableObject
    {
        public LoginViewModel()
        {
            Title = "Aspen Login!";

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

           // OutputText = "Ready to go!";
        }

        public OidcClient client;
        public LoginResult _result;
        public Lazy<HttpClient> _apiClient = new Lazy<HttpClient>(() => new HttpClient());
        public string accessToken;

        [ObservableProperty] private string title;
        [ObservableProperty] private string outputText;

        [ObservableProperty, AlsoNotifyChangeFor(nameof(CanLogOut))] private bool canLogIn;
        public bool CanLogOut => !CanLogIn;

        [ObservableProperty]
        public bool isAdmin;

        [ICommand]
        private async Task Logout()
        {
            SecureStorage.Remove("accessToken");
            try
            {
                await client.LogoutAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
            CanLogIn = true;
            isAdmin = false;
        }


        [ICommand]
        private async Task Login()
        {
            try
            {
                accessToken = await SecureStorage.GetAsync("accessToken");
                if (accessToken == null)
                {
                    _result = await client.LoginAsync(new LoginRequest());

                    if (_result.IsError)
                    {
                        OutputText = _result.Error;
                        return;
                    }

                    accessToken = _result.AccessToken;

                    await SecureStorage.SetAsync("accessToken", accessToken);
                    isAdmin = IsAdminJWTDecode(accessToken);

                    //OutputText = sb.ToString();
                }

                CanLogIn = false;

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
        private bool IsAdminJWTDecode(string jwt)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(jwt);
            return jwtSecurityToken.ToString().Contains("\"family_name\":\"admin\"");
        }
    }
}