using AspenMobile.GlobalConstants;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class CreateNewEventViewModel : ObservableObject
    {
        [ObservableProperty]
        public int id;
        [ObservableProperty]
        public System.DateTime date;
        [ObservableProperty]
        public string title;
        [ObservableProperty]
        public string location;
        [ObservableProperty]
        public string description;
        [ObservableProperty]
        public string primaryImageUrl;
        [ObservableProperty]
        public decimal donationTarget;

        private readonly HttpClient httpClient = new();
        private string current;
        private Lazy<HttpClient> apiClient = new Lazy<HttpClient>(() => new HttpClient());
        public CreateNewEventViewModel()
        {
            current = Preferences.Get(Constants.CurrentServer, null);
            if (current == null)
            {
                Shell.Current.GoToAsync($"{nameof(SettingsPage)}");
            }
            apiClient.Value.BaseAddress = new Uri($"{current}/api/");
        }

        [ICommand]
        public async Task SubmitNewEventAsync()
        {
            DtoEvent NewEvent = new DtoEvent();

            NewEvent.Date = date;
            NewEvent.Title = title;
            NewEvent.Location = location;
            NewEvent.Description = description;
            NewEvent.PrimaryImageUrl = primaryImageUrl;
            NewEvent.DonationTarget = donationTarget;

            await httpClient.PostAsJsonAsync($"{current}/api/events", NewEvent);

            await Shell.Current.GoToAsync($"//{nameof(HomePage)}");
        }
    }
}
