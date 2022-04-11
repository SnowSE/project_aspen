using IdentityModel.OidcClient;
using IdentityModel.OidcClient.Browser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    /*public partial class Events : ObservableObject
    {
        public Events()
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

            _client = new OidcClient(options);
            _apiClient.Value.BaseAddress = new Uri("https://engineering.snow.edu/aspen/");

            OutputText = "Ready to go!";
        }

        OidcClient _client;
        LoginResult _result;
        Lazy<HttpClient> _apiClient = new Lazy<HttpClient>(() => new HttpClient());

        [ObservableProperty]
        private string outputText;

        [ICommand]
        [Authorize]
        private async Task GetEvent()
        {
            try
            {
                //var result = await _apiClient.Value.GetAsync("https://aspen-api-082f35.azurewebsites.net/api/events");
                //var result = await _apiClient.Value.GetAsync("https://aspen-api-29ed48.azurewebsites.net/api/events");
                var result = await _apiClient.Value.GetAsync("api/events");

                if (result.IsSuccessStatusCode)
                {
                    OutputText = JsonDocument.Parse(await result.Content.ReadAsStringAsync()).RootElement.ToString();
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

        [ICommand]
        [Authorize]
        private async Task PostEvent()
        {
            var result = await _apiClient.Value.GetAsync("api/events");

            "date": "2022-04-08T20:29:01.315Z",
                "title": "string",
                "location": "string",
                "description": "string",
                "primaryImageUrl": "string",
                "donationTarget": 0
        }

        [ICommand]
        [Authorize]
        private async Task DeleteEvent(int id)
        {
            var result = await _apiClient.Value.GetAsync("api/events/{id}");
            result.Content.Dispose();
        }

    }*/
}
