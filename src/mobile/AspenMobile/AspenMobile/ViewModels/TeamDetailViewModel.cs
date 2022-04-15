using AspenMobile.GlobalConstants;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xamarin.Essentials;

namespace AspenMobile.ViewModels
{
    public partial class TeamDetailViewModel : ObservableObject
    {
        public ObservableCollection<DtoTeam> TeamInfoList { get; set; } = new();

        public TeamDetailViewModel()
        {
            GetTeamInfoAsync(TeamId);
        }

        [ObservableProperty]
        private string errorMessage;

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
                Preferences.Set(Constants.CurrentEventId, value.ToString());

            }
        }

        public async Task GetTeamInfoAsync(int teamID)
        {
            var httpClient = new HttpClient();
            try
            {
                var testUri = "https://engineering.snow.edu/aspen/api/teams/25";
                var server = Preferences.Get(Constants.CurrentServer, null) ?? throw new Exception("No server address set");
                var realUri = $"{server}/api/teams/{teamID}";

                var uri = new Uri($"{testUri}");

                var teams = await httpClient.GetFromJsonAsync<DtoTeam>(uri);
              

                    TeamInfoList.Add(teams);
                
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }
        }


    }
}