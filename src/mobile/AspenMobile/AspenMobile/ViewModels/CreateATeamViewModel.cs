﻿using AspenMobile.GlobalConstants;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class CreateATeamViewModel : ObservableObject
    {
        [ObservableProperty]
        public string name;
        [ObservableProperty]
        public string description;
        [ObservableProperty]
        public decimal donationTarget;

        private readonly HttpClient httpClient = new();
        private string current;
        private Lazy<HttpClient> apiClient = new Lazy<HttpClient>(() => new HttpClient());
        private long currentEventId;
        private long currentUserId;

        public CreateATeamViewModel()
        {
            current = Preferences.Get(Constants.CurrentServer, null);
            if (current == null)
            {
                Shell.Current.GoToAsync($"{nameof(SettingsPage)}");
            }
            apiClient.Value.BaseAddress = new Uri($"{current}/api/");


            currentEventId = Preferences.Get(Constants.CurrentEventId, -1L);
            currentUserId = Preferences.Get(Constants.UserID, -1L);

            if (currentEventId == -1 || currentUserId == -1)
            {
                throw new Exception("Unable to locate current event or you are not logged in");
            }
        }

        [ICommand]
        public async void CreateTeamAsync()
        {
            DtoTeam NewTeam = new DtoTeam();

            NewTeam.Name = Name;
            NewTeam.Description = Description;
            NewTeam.DonationTarget = DonationTarget;
            NewTeam.OwnerID = currentUserId;
            NewTeam.EventID = currentEventId;
            NewTeam.MainImage = ""; // question about this

            await httpClient.PostAsJsonAsync($"{current}/api/teams", NewTeam);

            var test = await httpClient.GetFromJsonAsync<List<DtoTeam>>($"{current}/api/teams/event/{currentEventId}");
            await Shell.Current.GoToAsync($"//{nameof(HomePage)}");

        }
    }
}
