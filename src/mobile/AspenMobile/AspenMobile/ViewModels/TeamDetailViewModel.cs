using AspenMobile.Models;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class TeamDetailViewModel : ObservableObject
    {
        public ObservableCollection<Team> TeamList { get; }

        public TeamDetailViewModel()
        {
            // var teams = new ObservableCollection<Team>();
            TeamList = new ObservableCollection<Team>();

        }

        [ObservableProperty]
        private string teamName;
        [ObservableProperty]
        private int teamId;
        [ObservableProperty]
        private string teamDescription;
        [ObservableProperty]
        private string mainImage;
        [ObservableProperty]
        private int ownerID;
        [ObservableProperty]
        private int eventID;
        [ObservableProperty]
        private double donationTarget;

        [ICommand]
        public void GetTeamInfo(Team teamInfo)
        {
            // var TeamInfo = Preferences.Get("TheTeam", null);
            var team = new Team();


            team.TeamName = teamName;
            //if (teamInfo == null)
            //{
            //    return;
            //}



            //List<Team> teamInfolist = new List<Team>();
            //teamInfo.OwnerID = ownerId;
            //foreach (var value in TeamList)
            //{
            //    teamInfo.teamName = TeamDetailViewModel.teamName;
            //    teamInfo.teamId = TeamDetailViewModel.teamId;


            //}
            //if (teamInfo == null)
            //{
            //    return;
            //}
            //Preferences.Get("MyTeam",{(teamInfo.teamName = teamName), (teamInfo.teamId=teamId }))

        }

    }
}