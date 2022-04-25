using AspenMobile.GlobalConstants;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;

namespace AspenMobile.ViewModels
{
    public partial class AccountViewModel : ObservableObject
    {
        //Change Events to a data type that is not an ObservableCollection
        //Donations not coming back correctly, maybe wrong api endpoint??
        public ObservableCollection<DtoEvent> Events = new ObservableCollection<DtoEvent>();
        public ObservableCollection<DtoDonation> Donations = new ObservableCollection<DtoDonation>();
        private string currentServer = Preferences.Get(Constants.CurrentServer, null);
        public AccountViewModel()
        {

        }

        internal async Task OnAppearingAsync()
        {
            await GetAllEventsAsync();
            await GetAllDonationsAsync();
        }

        private async Task GetAllDonationsAsync()
        {
            try
            {
                var httpClient = new HttpClient();
                var personid = Preferences.Get(Constants.UserID, 0L);
                foreach (var e in Events)
                {
                    var uri = new Uri($"{currentServer}/api/donations/{e.ID}");
                    var allDons = await httpClient.GetFromJsonAsync<IEnumerable<DtoDonation>>(uri);
                    foreach (var don in allDons)
                    {
                        if(don.PersonID == personid)
                        {
                            Donations.Add(don);
                        }
                    }
                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        private async Task GetAllEventsAsync()
        {
            var httpClient = new HttpClient();
            try
            {

                var uri = new Uri($"{currentServer}/api/events");
                var allEvents = await httpClient.GetFromJsonAsync<IEnumerable<DtoEvent>>(uri);
                foreach (var e in allEvents)
                {
                    Events.Add(e);
                }

            }
            catch (Exception)
            {

                throw;
            }
        }


    }
}
