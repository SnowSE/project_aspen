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

        public async Task GetTeamInfoAsync()
        {
            var httpClient = new HttpClient();

            //Need to ask a Jonathan which string to use
            try
            {
                var server = Preferences.Get(Constants.CurrentServer, null) ?? throw new Exception("No server address set");
                var uri = new Uri($"{server}/api/teams/{teamId}");
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