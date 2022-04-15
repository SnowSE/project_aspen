using AspenMobile.GlobalConstants;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class Events : ObservableObject
    {
        private readonly HttpClient httpClient = new();
        private string current;
        private Lazy<HttpClient> apiClient = new Lazy<HttpClient>(() => new HttpClient());
        private string accessToken;


        public Events()
        {
            current = Preferences.Get(Constants.CurrentServer, null);
            if (current == null)
            {
                Shell.Current.GoToAsync($"{nameof(SettingsPage)}");
            }
            apiClient.Value.BaseAddress = new Uri($"{current}/api/");

        }
        internal async Task OnAppearingAsync()
        {
            accessToken = await SecureStorage.GetAsync(Constants.AccessToken);
            if (apiClient.Value.DefaultRequestHeaders.Authorization == null)
            {
                apiClient.Value.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken ?? "");
            }
        }

        [ObservableProperty]
        private string outputText;

        public ObservableCollection<DtoEvent> AllEvents { get; set; } = new();

        [ICommand]
        public async Task GetAllEventsAsync()
        {
            AllEvents.Clear();
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
        private async Task EditEventAsync()
        {
            await Shell.Current.GoToAsync($"{nameof(EditEventPage)}");
        }

        [ICommand]
        private async Task DeleteEventByIDAsync(long id)
        {
            await httpClient.DeleteAsync($"{current}/api/events/{id}");
        }

    }
}
