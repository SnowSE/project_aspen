using AspenMobile.GlobalConstants;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using shared.DtoModels;
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
    public partial class AboutViewModel : ObservableObject
    {
        private readonly HttpClient httpClient = new();
        private string current;

        public AboutViewModel()
        {
            current = Preferences.Get(Constants.CurrentServer, null);
            if (current == null)
            {
                Shell.Current.GoToAsync($"{nameof(SettingsPage)}");
            }
        }

        public ObservableCollection<DtoEvent> Events { get; set; } = new();

        [ICommand]
        public async Task GetAllEvents()
        {
            var allEvents = await httpClient.GetFromJsonAsync<List<DtoEvent>>($"{current}/api/events");

            foreach (var item in allEvents)
            {
                Events.Add(item);
            }
        }

        [ICommand]
        public async void SelectEvent(DtoEvent selectedEvent)
        {
            if (selectedEvent == null)
                return;

            // This will push the ItemDetailPage onto the navigation stack
            await Shell.Current.GoToAsync($"{nameof(EventPage)}?{nameof(EventPageViewModel.EventId)}={selectedEvent.ID}");
            //await Shell.Current.GoToAsync($"{nameof(TaskDetailPage)}?{nameof(EventViewModel.ItemId)}={item.ID}");

        }

        [ICommand]
        public async void CreateATeam()
        {
            await Shell.Current.GoToAsync($"{nameof(CreateATeamPage)}");
        }
    }
}