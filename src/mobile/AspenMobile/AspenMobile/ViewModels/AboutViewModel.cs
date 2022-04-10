using System;
using System.Windows.Input;
using Xamarin.Essentials;
using Xamarin.Forms;
using AspenMobile.Models;
using AspenMobile.GlobalConstants;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.Input;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Json;
using System.Collections.Generic;
using shared.DtoModels;
using System.Collections.ObjectModel;
using Microsoft.Toolkit.Mvvm.ComponentModel;

namespace AspenMobile.ViewModels
{
    public partial class AboutViewModel : ObservableObject
    {
        private readonly HttpClient httpClient = new();
        public AboutViewModel()
        {
            var current = Preferences.Get(Constants.CurrentServer, null);
            if (current == null)
            {
                Shell.Current.GoToAsync($"{nameof(SettingsPage)}");
            }
            Test = "chef";
        }

        public ObservableCollection<DtoEvent> Events { get; set; } = new();


        [ObservableProperty]
        public string test;

        [ICommand]
        public async Task GetAllEvents()
        {
            var allEvents = await httpClient.GetFromJsonAsync<List<DtoEvent>>("https://engineering.snow.edu/aspen/api/events");

            foreach (var item in allEvents)
            {
                Events.Add(item);
            }
        }

        [ICommand]
        public async void SelectEvent(DtoEvent item)
        {
            if (item == null)
                return;

            // This will push the ItemDetailPage onto the navigation stack
            //await Shell.Current.GoToAsync($"{nameof(EventPage)}?{nameof(EventPageViewModel.ItemId)}={item.ID}");
            await Shell.Current.GoToAsync("/EventPage");

        }
    }
}