using AspenMobile.GlobalConstants;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using shared.DtoModels;
using System;
using System.Collections.Generic;
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

        public TeamDetailViewModel()
        {
        }

        private int teamId;//needs to be set by naviagation parameter
        public int TeamId
        {
            get
            {
                return teamId;
            }
            set
            {
                teamId = value;
                GetTeamInfoAsync(value);

            }
        }


        [ObservableProperty]
        private string errorMessage;


        public async Task GetTeamInfoAsync(int teamId)
        {
            var httpClient = new HttpClient();

            //Need to ask a Jonathan which string to use
            try
            {
                var server = Preferences.Get(Constants.CurrentServer, null) ?? throw new Exception("No server address set");
                var uri = new Uri($"{server}/api/teams/{teamId}");
                var team = await httpClient.GetFromJsonAsync<DtoTeam>(uri);

                Team = team;
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }
        }


    }
}