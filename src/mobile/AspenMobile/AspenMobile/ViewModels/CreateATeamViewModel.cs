using AspenMobile.GlobalConstants;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.Input;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class CreateATeamViewModel
    {
        public int id { get; set; }
        public string date { get; set; }
        public string title { get; set; }
        public string location { get; set; }
        public string description { get; set; }
        public string primaryImageUrl { get; set; }
        public double donationTarget { get; set; }
        private readonly HttpClient httpClient = new();
        private string current;
        private Lazy<HttpClient> apiClient = new Lazy<HttpClient>(() => new HttpClient());
        public CreateATeamViewModel()
        {
            current = Preferences.Get(Constants.CurrentServer, null);
            if (current == null)
            {
                Shell.Current.GoToAsync($"{nameof(SettingsPage)}");
            }
            apiClient.Value.BaseAddress = new Uri($"{current}/api/");
        }

        [ICommand]
        public async Task SubmitNewEventAsync()
        {
           // await httpClient.PostAsync($"{current}/api/events");
        }
    }
}
