using AspenMobile.GlobalConstants;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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

        private int teamId;//needs to be set by naviagation parameter


    }
}