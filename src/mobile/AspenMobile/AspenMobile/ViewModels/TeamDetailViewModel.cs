using AspenMobile.GlobalConstants;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using shared.DtoModels;
using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    [QueryProperty(nameof(TeamId), nameof(TeamId))]

    public partial class TeamDetailViewModel : ObservableObject
    {
        [ObservableProperty]
        public DtoTeam team;
        [ObservableProperty]
        public decimal currentDonatedAmount;

        public TeamDetailViewModel()
        {
            GetTeamInfoAsync(36,5);
        }

        private int teamId;//needs to be set by naviagation parameter
        private int eventId;

        public int EventId
        {
            get
            {
                return eventId;
            }
            set
            {
                eventId = value;
                

            }
        }
        public int TeamId
        {
            get
            {
                return teamId;
            }
            set
            {
                teamId = value;
                

            }
        }


        [ObservableProperty]
        private string errorMessage;


        public async Task GetTeamInfoAsync(int teamId, int eventId)
        {
            var httpClient = new HttpClient();
            try
            {
                var server = Preferences.Get(Constants.CurrentServer, null) ?? throw new Exception("No server address set");
                var uri = new Uri($"{server}/api/teams/{teamId}");
                var team = await httpClient.GetFromJsonAsync<DtoTeam>(uri);
                var currentDonationUri = new Uri($"{server}/api/donations/{eventId}/{teamId}");

                Team = team;
                var dtoDonation = await httpClient.GetFromJsonAsync<decimal>(currentDonationUri);

                
                CurrentDonatedAmount = dtoDonation;
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }
        }


    }
}