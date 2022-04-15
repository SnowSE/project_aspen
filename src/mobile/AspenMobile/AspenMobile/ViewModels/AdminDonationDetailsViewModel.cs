using AspenMobile.GlobalConstants;
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
    public partial class AdminDonationDetailsViewModel : ObservableObject
    {
        //private readonly HttpClient httpClient = new();
        public ObservableCollection<DtoDonation> Donations { get; set; } = new();

        public AdminDonationDetailsViewModel()
        {
            current = Preferences.Get(Constants.CurrentServer, null);
            DisplayDonationAsync();
        }

        public int eventId;
        private string current;

       [ObservableProperty]
        private string errorMessage; 

        public async void DisplayDonationAsync()
        {



            var httpClient = new HttpClient();
            var testUri = "https://engineering.snow.edu/aspen/api/donations/2";
           // var currentEvent = await GetClosestEventAsync();
           // var donationDetails = await httpClient.GetFromJsonAsync<List<DtoDonation>>($"{current}/api/donations/{currentEvent.ID}");

            //foreach (var donation in donationDetails)
            //{
            //    Donations.Add(donation);
            //}
            try
            {
                var server = Preferences.Get(Constants.CurrentServer, null) ?? throw new Exception("No server address set");
                var uri = new Uri($"{testUri}");



                var donation = await httpClient.GetFromJsonAsync<DtoDonation>(uri);

                Donations.Add(donation);

            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }

        }
        //need to uncomment this after testing
        //public async Task<DtoEvent> GetClosestEventAsync()
        //{
        //    var allEvents = await httpClient.GetFromJsonAsync<List<DtoEvent>>($"{current}/api/events");

        //    DtoEvent closestEvent = new DtoEvent();
        //    double prev = 0;
        //    double smallestTime = 0;
        //    foreach (var item in allEvents)
        //    {
        //        var seconds = item.Date - DateTime.Now;
        //        if (seconds.TotalSeconds > 0)
        //        {
        //            smallestTime = seconds.TotalSeconds;
        //            if (smallestTime < prev || prev == 0)
        //            {
        //                closestEvent = item;
        //            }
        //            prev = smallestTime;
        //        }
        //    }
        //    return closestEvent;
        //}
        /*public async Task<DtoEvent> GetDonatinInfoAsync()
        {
            var allEvents = await httpClient.GetFromJsonAsync<List<DtoEvent>>($"{current}/api/events");

            DtoEvent closestEvent = new DtoEvent();
            double prev = 0;
            double smallestTime = 0;
            foreach (var item in allEvents)
            {
                var seconds = item.Date - DateTime.Now;
                if (seconds.TotalSeconds > 0)
                {
                    smallestTime = seconds.TotalSeconds;
                    if (smallestTime < prev || prev == 0)
                    {
                        closestEvent = item;
                    }
                    prev = smallestTime;
                }
            }
            return closestEvent;
        }*/
    }
}
