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

namespace AspenMobile.ViewModels
{
    public partial class TeamDetailViewModel : ObservableObject
    {
        public ObservableCollection<DtoTeam> TeamInfoList { get; }

        public TeamDetailViewModel()
        {
            
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
                GetTeamInfoAsync(value);
            }
        }

        public async Task GetTeamInfoAsync(int teamId)
        {
            var httpClient = new HttpClient();

           
            try
            {
               // var server = Preferences.Get(Constants.CurrentServer, null) ?? throw new Exception("No server address set");
                //var uri = https://engineering.snow.edu/aspen/api/teams/25
                var uri = new Uri("https://engineering.snow.edu/aspen/api/teams/25/api/teams/{teamId}");
                var teams = await httpClient.GetFromJsonAsync<List<DtoTeam>>(uri);
                foreach (var team in teams)
                {
                    TeamInfoList.Add(team);
                }
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }
        }


    }
}