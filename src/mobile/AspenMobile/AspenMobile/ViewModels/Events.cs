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
        private Lazy<HttpClient> apiClient = new Lazy<HttpClient>(() => new HttpClient());


        public Events()
        {
            current = Preferences.Get(Constants.CurrentServer, null);
            if (current == null)
            {
                Shell.Current.GoToAsync($"{nameof(SettingsPage)}");
            }
            apiClient.Value.BaseAddress = new Uri($"{current}/aspen/");

        }

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
        private async Task EditEventAsync()
        {
            await Shell.Current.GoToAsync($"{nameof(EditEventPage)}");
        }

        [ICommand]
        [Authorize]
        private async Task DeleteEventByIDAsync(int id)
        {
            await httpClient.DeleteAsync($"{current}/api/events/{id}");
        }

    }
}
