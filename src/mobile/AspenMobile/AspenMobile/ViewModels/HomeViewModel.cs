using AspenMobile.GlobalConstants;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class HomeViewModel : ObservableObject
    {
        private readonly HttpClient httpClient = new();
        private string current;
        public HomeViewModel()
        {
            DisplayEventAsync();
        }

        public ObservableCollection<DtoEvent> Event { get; set; } = new();
        public ObservableCollection<DtoTeam> Teams { get; set; } = new();

        [ICommand]
        public async Task RefeshEvents()
        {
            await DisplayEventAsync();
        }

        public async Task DisplayEventAsync()
        {
            current = Preferences.Get(Constants.CurrentServer, null);
            if (current == null)
            {
                await Shell.Current.GoToAsync($"{nameof(SettingsPage)}");
            }

            try
            {
                var closestEvent = await GetClosestEventAsync();
                Event.Add(closestEvent);
                var teams = await httpClient.GetFromJsonAsync<List<DtoTeam>>($"{current}/api/teams/event/{closestEvent.ID}");

                foreach (var team in teams)
                {
                    Teams.Add(team);
                }

            }
            catch (Exception)
            {


            }
        }

        public async Task<DtoEvent> GetClosestEventAsync()
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
        }

        [ICommand]
        public async void CreateATeam()
        {
            await Shell.Current.GoToAsync($"{nameof(CreateATeamPage)}");
        }
    }
}