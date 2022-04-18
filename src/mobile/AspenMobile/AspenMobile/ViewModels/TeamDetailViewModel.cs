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
            GetTeamInfoAsync();
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

        public async Task GetTeamInfoAsync()
        {
            var httpClient = new HttpClient();
            try
            {
                var testUri = "https://engineering.snow.edu/aspen/api/teams/25";
                var server = Preferences.Get(Constants.CurrentServer, null) ?? throw new Exception("No server address set");
                var uri = new Uri($"{testUri}");

                var teamInfo = await httpClient.GetFromJsonAsync<DtoTeam>(uri);
               
                    TeamInfoList.Add(teamInfo);
                
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }
        }


    }
}