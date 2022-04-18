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
    public partial class AdminDonationDetailsViewModel : ObservableObject
    {
        //private readonly HttpClient httpClient = new();
        [ObservableProperty]
        public int donation;
        public AdminDonationDetailsViewModel()
        {
           DisplayDonationAsync();

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
               // DisplayDonationAsync(value);
            }
        }
        public ObservableCollection<DtoDonation> Donations;




        public async void DisplayDonationAsync()
        {
            //current = Preferences.Get(Constants.CurrentServer, null);
            var httpClient = new HttpClient();


            // var currentEvent = await httpClient.GetFromJsonAsync<DtoEvent>($"{current}/api/events/{eventId}");

            var testServer = "https://engineering.snow.edu/aspen/api/donations/2";

            var uri = new Uri($"{testServer}");
            var donation = await httpClient.GetFromJsonAsync<int>(uri);
           // Console.WriteLine(donation.ToString());
            //Donations.Add(donation);
            Donation=donation;

          //  var donationDetails = await httpClient.GetFromJsonAsync<List<DtoTeam>>($"{current}/api/admin/donations/{currentEvent.ID}");

             //foreach (var donation in donationDetails)
             //{
             //    Donations.Add(donation);
             //}
            // var test = Preferences.Get(Constants.CurrentEventId, null);

        }
    }
}
