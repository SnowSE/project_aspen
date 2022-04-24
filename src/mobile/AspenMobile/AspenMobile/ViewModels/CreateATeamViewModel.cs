using AspenMobile.GlobalConstants;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class CreateATeamViewModel:ObservableObject
    {
        [ObservableProperty]
        public string name;
        [ObservableProperty]
        public string description;
        [ObservableProperty]
        public decimal donationTarget;

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
        public async void CreateTeamAsync()
        {
            DtoTeam NewTeam = new DtoTeam();

            NewTeam.Name = Name;
            NewTeam.Description = Description;
            NewTeam.DonationTarget = DonationTarget;
            NewTeam.OwnerID = long.Parse(Preferences.Get(Constants.UserID, null));
            NewTeam.EventID = long.Parse(Preferences.Get(Constants.CurrentEventId, null));
            NewTeam.Amount = 0; // question about this
            NewTeam.MainImage = ""; // question about this

            await httpClient.PostAsJsonAsync($"{current}/api/teams", NewTeam);
            
            var test = await httpClient.GetFromJsonAsync<List<DtoTeam>>($"{current}/api/teams/event/{Preferences.Get(Constants.CurrentEventId, null)}");
            await Shell.Current.GoToAsync($"//{nameof(HomePage)}");

        }
    }
}
