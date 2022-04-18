using AspenMobile.GlobalConstants;
using Microsoft.Extensions.Logging;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    [QueryProperty(nameof(EventId), nameof(EventId))]
    public partial class AdminDonationDetailsViewModel : ObservableObject
    {
        //private readonly HttpClient httpClient = new();
        //[ObservableProperty]
        //public int donation;
        public AdminDonationDetailsViewModel()
        {
           DisplayDonationAsync();

        }

        public int eventId;
        private string current;

       [ObservableProperty]
        private string errorMessage;
        [ObservableProperty]
        public ObservableCollection<DtoDonation> donations;

        public async void DisplayDonationAsync()
        {
            //current = Preferences.Get(Constants.CurrentServer, null);
            var httpClient = new HttpClient();


            // var currentEvent = await httpClient.GetFromJsonAsync<DtoEvent>($"{current}/api/events/{eventId}");

            var testServer = "https://engineering.snow.edu/aspen/api/donations/2";

            var uri = new Uri($"{testServer}");
            var donation = await httpClient.GetFromJsonAsync<DtoDonation>(uri);
           // Console.WriteLine(donation.ToString());
            Donations.Add(donation);
           // Donations=donation;

          //  var donationDetails = await httpClient.GetFromJsonAsync<List<DtoTeam>>($"{current}/api/admin/donations/{currentEvent.ID}");

             //foreach (var donation in donationDetails)
             //{
             //    Donations.Add(donation);
             //}
            // var test = Preferences.Get(Constants.CurrentEventId, null);

        }
    }
}
