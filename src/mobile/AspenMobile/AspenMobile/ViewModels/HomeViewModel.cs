﻿using AspenMobile.GlobalConstants;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class HomeViewModel : ObservableObject
    {
        private readonly HttpClient httpClient = new();
        private readonly LoginViewModel loginViewModel;
        private string current;
        [ObservableProperty]
        private bool canCreateTeam;
        public HomeViewModel(LoginViewModel loginViewModel)
        {

            DisplayEventAsync();
            this.loginViewModel = loginViewModel;
        }


        [ObservableProperty]
        public DtoEvent currentEvent;
        public ObservableCollection<DtoTeam> Teams { get; set; } = new();

        [ICommand]
        public async Task RefeshEventsAsync()
        {
            await DisplayEventAsync();
        }

        public async Task DisplayEventAsync()
        {
            current = Preferences.Get(Constants.CurrentServer, null);
            if (current == null)
            {
                await Shell.Current.GoToAsync($"{nameof(SettingsPage)}");
            }
            //CanCreateTeam = (Preferences.Get(Constants.UserID, -1L) != -1L);

            try
            {
                var closestEvent = await GetClosestEventAsync();

                Preferences.Set(Constants.CurrentEventId, closestEvent.ID);

                CurrentEvent = closestEvent;
                var teams = await httpClient.GetFromJsonAsync<List<DtoTeam>>($"{current}/api/teams/event/{closestEvent.ID}");
                Teams.Clear();
                foreach (var team in teams)
                {
                    Teams.Add(team);
                }
            }
            catch (Exception ex)
            {
                await Application.Current.MainPage.DisplayAlert("Can't connect to server", "Make sure you are connected to a server, conectar a un server verificar que sus credentials son validas", "Ok");
                await Shell.Current.GoToAsync($"{nameof(SettingsPage)}");

            }


        }

        public async Task<DtoEvent> GetClosestEventAsync()
        {

            var allEvents = await httpClient.GetFromJsonAsync<List<DtoEvent>>($"{current}/api/events");

            DtoEvent closestEvent = new DtoEvent();
            double prev = 0;
            double smallestTime = 0;
            foreach (var item in allEvents)
            {
                var seconds = item.Date - DateTime.Now;
                if (seconds.TotalSeconds > 0)
                {
                    smallestTime = seconds.TotalSeconds;
                    if (smallestTime < prev || prev == 0)
                    {
                        closestEvent = item;
                        prev = smallestTime;
                    }
                }
            }
            return closestEvent;
        }

        [ICommand]
        public async void CreateATeamAsync()
        {


            if (loginViewModel.CanLogOut)
            {
                await Shell.Current.GoToAsync($"{nameof(CreateATeamPage)}");
            }
            else
            {
                await Application.Current.MainPage.DisplayAlert("Can't create Team", "You must be logged in to create team", "Ok");
                await loginViewModel.ToggleLoginLogoutAsync();
            }
        }

        [ICommand]
        public async void OnTeamSelectedAsync(DtoTeam team)
        {
            await Shell.Current.GoToAsync($"{nameof(TeamPage)}?{nameof(TeamDetailViewModel.TeamId)}={team.ID}");
        }
    }
}