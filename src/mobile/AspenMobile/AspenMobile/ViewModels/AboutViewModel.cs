using IdentityModel.OidcClient;
using IdentityModel.OidcClient.Browser;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class AboutViewModel : ObservableObject
    {
        public AboutViewModel()
        {
            OpenWebCommand = new Command(async () => await Browser.OpenAsync("https://aka.ms/xamarin-quickstart"));

            var browser = DependencyService.Get<IBrowser>();
            var options = new OidcClientOptions
            {
                Authority = "https://engineering.snow.edu/aspen/auth/realms/aspen",
                ClientId = "aspen-web",
                Scope = "profile email api-use",
                RedirectUri = "xamarinformsclients://callback",
                Browser = browser
            };
            _client = new OidcClient(options);
            _apiClient.Value.BaseAddress = new Uri("https://engineering.snow.edu/aspen/auth/realms/aspen");
            OutputText = "Let's a Go";
        }


        public ICommand OpenWebCommand { get; }
        public OidcClient _client;
        public LoginResult _result;
        public Lazy<HttpClient> _apiClient = new Lazy<HttpClient>(() => new HttpClient());
        public string accessToken;

        [ObservableProperty]
        private string outputText;

        [ICommand]
        private async Task GetDonationInfo()
        {
            try
            {
                var result = await _apiClient.Value.GetAsync("api/Admin/donation/{eventID}");

                if (result.IsSuccessStatusCode)
                {
                    OutputText = JsonDocument.Parse(await result.Content.ReadAsStringAsync()).RootElement.GetRawText();
                }
                else
                {
                    OutputText = result.ToString();
                }
            }
            catch (Exception ex)
            {
                OutputText = ex.ToString();
            }
        }
    }

}