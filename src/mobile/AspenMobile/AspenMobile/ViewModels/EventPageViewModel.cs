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
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    [QueryProperty(nameof(ItemId), nameof(ItemId))]

    public partial class EventPageViewModel : ObservableObject
    {
        private readonly HttpClient httpClient;
        public EventPageViewModel()
        {

        }
        /*[ObservableProperty]
        public string itemId;*/

        public string ItemId { get; set; }
        public ObservableCollection<DtoEvent> Event { get; set; } = new();
        public ObservableCollection<DtoTeam> Teams { get; set; } = new();



        [ICommand]
        public async Task DisplayEventAsync()
        {
            var currentEvent = await httpClient.GetFromJsonAsync<DtoEvent>($"https://engineering.snow.edu/aspen/api/events/{ItemId}");
            Event.Add(currentEvent);

            var teams = await httpClient.GetFromJsonAsync<List<DtoTeam>>($"https://engineering.snow.edu/aspen/api/teams/event/{currentEvent.ID}");

            foreach(var team in teams)
            {
                Teams.Add(team);
            }
        }
    }
}
