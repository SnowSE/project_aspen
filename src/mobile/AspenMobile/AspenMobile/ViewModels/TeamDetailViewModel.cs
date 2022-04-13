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

       
