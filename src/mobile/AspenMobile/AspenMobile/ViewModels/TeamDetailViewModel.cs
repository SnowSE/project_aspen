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
            GetTeamInfoAsync();
        }

        [ObservableProperty]
        private string errorMessage;

        //private int teamId;//needs to be set by naviagation parameter

       
        //public int TeamId
        //{
        //    get
        //    {
        //        return teamId;
        //    }
        //    set
        //    {
        //        teamId = 25;
        //        Preferences.Set(Constants.CurrentEventId, value.ToString());
                
        //    }
        //}

        public async Task GetTeamInfoAsync()
        {
            var httpClient = new HttpClient();
            try
            {
                var server = Preferences.Get(Constants.CurrentServer, null) ?? throw new Exception("No server address set");
                var uri = new Uri("https://engineering.snow.edu/aspen/api/teams/25");

               // var dtoTeamInfos = JsonConvert.DeserializeObject<List<DtoTeam>>(uri);
                var teams = await httpClient.GetFromJsonAsync<DtoTeam>(uri);
               // var content = await teams.Content.ReadAsStringAsync();
                //string json = content.ToString();
                //var jsonList = JArray.Parse(teams.ToString());


                    TeamInfoList.Add(teams);
                //foreach (var team in teams)
                //{
                //}
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }
        }


    }
}