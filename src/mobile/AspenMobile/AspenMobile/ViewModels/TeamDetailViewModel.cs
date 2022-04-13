using AspenMobile.GlobalConstants;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net.Http;
using System.Text;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class TeamDetailViewModel : ObservableObject
    {
        public ObservableCollection<DtoTeam> TeamInfoList { get; }

        public TeamDetailViewModel()
        {
            GetTeamInfoAsync();
        }

        //[ObservableProperty]
        //private string teamName;
        //[ObservableProperty]
        //private long teamId;
        //[ObservableProperty]
        //private string teamDescription;
        //[ObservableProperty]
        //private string mainImage;
        //[ObservableProperty]
        //private long ownerID;
        //[ObservableProperty]
        //private long eventID;
        //[ObservableProperty]
        //private decimal donationTarget;

       
        public async void GetTeamInfoAsync()
        {
            var uri = new Uri("https://engineering.snow.edu/aspen/team/36");
            // var TeamInfo = Preferences.Get("TheTeam", null);
            var httpClient = new HttpClient();

            //Need to ask a Jonathan which string to use
            var response = await httpClient.GetAsync(uri);

            if(response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                string json = content.ToString();
                var dtoTeamInfos = JsonConvert.DeserializeObject<List<DtoTeam>>(json);
               var jsonList = JArray.Parse(dtoTeamInfos.ToString());
                foreach(var dtoTeamInfo in dtoTeamInfos)
                {
                    DtoTeam team = new DtoTeam();
                    string teamName = dtoTeamInfo.Name.ToString();
                    long teamId = dtoTeamInfo.ID;
                    string teamDescription=dtoTeamInfo.Description;
                    long ownerID=dtoTeamInfo.OwnerID;
                    long eventID=dtoTeamInfo.EventID;
                    decimal donationTarget=dtoTeamInfo.DonationTarget;

                    team.Name = teamName;
                    team.Description = teamDescription;
                    team.OwnerID = ownerID;
                    team.EventID = eventID;
                    team.DonationTarget = donationTarget;
                    team.ID = teamId;

                    TeamInfoList.Add(team);
                }
            }
             
            
            // assign the values 
            //team.TeamName = teamName;
            //team.TeamId = teamId;
            //team.OwnerID = ownerID;
            //team.EventID = eventID;
            //team.DonationTarget = donationTarget;
            ////team.TeamDescription = teamDescription;
            //team.MainImage = mainImage;
           

            //var theTeam = Preferences.Get(Constants.TeamInfo, TeamInfoList);





        }


    }
}