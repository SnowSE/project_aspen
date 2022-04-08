using IdentityModel.OidcClient;
using IdentityModel.OidcClient.Browser;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public class AboutViewModel : ObservableObject
    {
        public AboutViewModel()
        {
            
            var browser = DependencyService.Get<IBrowser>();
            var options = new OidcClientOptions
            {
                Authority = "https://engineering.snow.edu/aspen/auth/realms/aspen",
                ClientId = "aspen-web",
                Scope = "profile email api-use",
                RedirectUri = "xamarinformsclients://callback",
                Browser = browser
            };
            client = new OidcClient(options);
            apiClient.Value.BaseAddress = new Uri("https://engineering.snow.edu/aspen/auth/realms/aspen");
            OutputText = "Let's a Go";
        }

        public ICommand OpenWebCommand { get; }
        private OidcClient client;
        private LoginResult result;
        private Lazy<HttpClient> apiClient = new Lazy<HttpClient>(() => new HttpClient());
        private string accessToken;


        [ObservableProperty]
        private string outputText;

        [ICommand]
        private async Task CallEvents()
        {
            try
            {
                var currentEventId = 0;
                var result = await apiClient.Value.GetAsync("api/admin/donations/{currentEventId}");

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