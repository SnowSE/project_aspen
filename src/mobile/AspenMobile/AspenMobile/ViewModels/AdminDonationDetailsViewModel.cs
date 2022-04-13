using AspenMobile.GlobalConstants;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    [QueryProperty(nameof(EventId), nameof(EventId))]
    public class AdminDonationDetailsViewModel : ObservableObject
    {
        private readonly HttpClient httpClient = new();
        public AdminDonationDetailsViewModel()
        {

        }

        public int eventId;
        private string current;

        public int EventId
        {
            get
            {
                return eventId;
            }
            set
            {
                eventId = value;
                Preferences.Set(Constants.CurrentEventId, value.ToString());
                DisplayEventAsync(value);
            }
        }
        public ObservableCollection<DtoTeam> Donations { get; set; } = new();

        private void DisplayEventAsync(int value)
        {
            throw new NotImplementedException();
        }

        public async void DisplayDonationAsync(int eventId)
        {
            current = Preferences.Get(Constants.CurrentServer, null);

            var currentEvent = await httpClient.GetFromJsonAsync<DtoEvent>($"{current}/api/events/{eventId}");

            var donationDetails = await httpClient.GetFromJsonAsync<List<DtoTeam>>($"{current}/api/admin/donations/{currentEvent.ID}");

             foreach (var donation in donationDetails)
             {
                 Donations.Add(donation);
             }
            // var test = Preferences.Get(Constants.CurrentEventId, null);

        }
    }
}
