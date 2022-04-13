using AspenMobile.GlobalConstants;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using shared.DtoModels;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Json;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{

    public partial class EventPageViewModel : ObservableObject
    {
        /*private readonly HttpClient httpClient = new();
        private string current;
        public EventPageViewModel()
        {
            Preferences.Set(Constants.CurrentEventId, "4");
            DisplayEventAsync(4);
        }

            



        public ObservableCollection<DtoEvent> Event { get; set; } = new();
        public ObservableCollection<DtoTeam> Teams { get; set; } = new();


        public async void DisplayEventAsync(int eventId)
        {
            current = Preferences.Get(Constants.CurrentServer, null);
            if (current == null)
            {
                Shell.Current.GoToAsync($"{nameof(SettingsPage)}");
            }

            var currentEvent = await httpClient.GetFromJsonAsync<DtoEvent>($"{current}/api/events/{eventId}");
            Event.Add(currentEvent);

            var teams = await httpClient.GetFromJsonAsync<List<DtoTeam>>($"{current}/api/teams/event/{currentEvent.ID}");

            foreach (var team in teams)
            {
                Teams.Add(team);
            }
            var test = Preferences.Get(Constants.CurrentEventId, null);

        }*/
    }
}
