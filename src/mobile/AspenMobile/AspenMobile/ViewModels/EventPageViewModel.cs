using AspenMobile.GlobalConstants;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
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

    public partial class EventPageViewModel : ObservableObject
    {
        private readonly HttpClient httpClient = new();
        public EventPageViewModel()
        {

        }

        public int eventId;
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



        public ObservableCollection<DtoEvent> Event { get; set; } = new();
        public ObservableCollection<DtoTeam> Teams { get; set; } = new();


        public async void DisplayEventAsync(int eventId)
        {
            var currentEvent = await httpClient.GetFromJsonAsync<DtoEvent>($"https://engineering.snow.edu/aspen/api/events/{eventId}");
            Event.Add(currentEvent);

            var teams = await httpClient.GetFromJsonAsync<List<DtoTeam>>($"https://engineering.snow.edu/aspen/api/teams/event/{currentEvent.ID}");

            foreach(var team in teams)
            {
                Teams.Add(team);
            }
            var test = Preferences.Get(Constants.CurrentEventId, null);

        }
    }
}
