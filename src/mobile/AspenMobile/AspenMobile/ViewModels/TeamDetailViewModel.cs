using AspenMobile.GlobalConstants;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using shared.DtoModels;
using System;
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
            eventId = Preferences.Get(Constants.CurrentEventId, -1L);
            if (eventId < 0)
                throw new ArgumentNullException(nameof(eventId));

        }

        private long teamId;//needs to be set by naviagation parameter
        private long eventId;


        public long TeamId
        {
            get
            {
                return teamId;
            }
            set
            {
                teamId = value;
                GetTeamInfoAsync(teamId, eventId);

            }
        }


        [ObservableProperty]
        private string errorMessage;


        public async Task GetTeamInfoAsync(long teamId, long eventId)
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