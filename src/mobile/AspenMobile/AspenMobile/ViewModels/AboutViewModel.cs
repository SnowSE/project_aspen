using System;
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

        public ICommand OpenWebCommand { get; }
    }

}