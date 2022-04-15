using AspenMobile.GlobalConstants;
using AspenMobile.Views;
using IdentityModel.OidcClient;
using IdentityModel.OidcClient.Browser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class Events : ObservableObject
    {
        private readonly HttpClient httpClient = new();
        private string current;


        public Events()
        {
            current = Preferences.Get(Constants.CurrentServer, null);
            if (current == null)
            {
                Shell.Current.GoToAsync($"{nameof(SettingsPage)}");
            }

            var browser = DependencyService.Get<IBrowser>();
            var options = new OidcClientOptions
            {
                Authority = $"{current}/aspen/auth/realms/aspen",
                ClientId = "aspen-web",
                Scope = "profile email api-use",
                RedirectUri = "xamarinformsclients://callback",
                Browser = browser
            };

            client = new OidcClient(options);
            apiClient.Value.BaseAddress = new Uri($"{current}/aspen/");

            OutputText = "Ready to go!";
        }

        private OidcClient client;
        private LoginResult result;
        private Lazy<HttpClient> apiClient = new Lazy<HttpClient>(() => new HttpClient());

        [ObservableProperty]
        private string outputText;

        public ObservableCollection<DtoEvent> AllEvents { get; set; } = new();

        [ICommand]
        public async Task GetAllEventsAsync()
        {
            var allEvents = await httpClient.GetFromJsonAsync<List<DtoEvent>>($"{current}/api/events");

            foreach (var item in allEvents)
            {
                AllEvents.Add(item);
            }
        }

        [ICommand]
        public async Task CreateNewEventAsync()
        {
            await Shell.Current.GoToAsync($"{nameof(CreateNewEventPage)}");
        }

        [ICommand]
        [Authorize]
        private async Task EditEvent()
        {
            await Shell.Current.GoToAsync($"{nameof(EditEventPage)}");
        }

        [ICommand]
        [Authorize]
        private async Task DeleteEvent()
        {

        }

    }
}
