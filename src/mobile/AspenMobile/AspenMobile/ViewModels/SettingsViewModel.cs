using AspenMobile.GlobalConstants;
using AspenMobile.Models;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
//using Microsoft.VisualStudio.PlatformUI;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class SettingsViewModel : ObservableObject
    {
        private readonly HttpClient httpClient = new();
        public ObservableCollection<Server> Servers { get; }
        public SettingsViewModel()
        {
            Title = "Settings";
            ShowAddControls = false;
            ShowAddButton = true;
            ShowAddServerError = false;
            Servers = new ObservableCollection<Server>();
            loadServers();

        }

        [ObservableProperty]
        private string title;
        [ObservableProperty]
        private bool showAddControls;
        [ObservableProperty]
        private bool showAddButton;
        [ObservableProperty]
        private string serverAlias;
        [ObservableProperty]
        private string serverAddress;
        [ObservableProperty]
        private string alias;
        [ObservableProperty]
        private string address;
        [ObservableProperty]
        private string selectedServer;

        [ObservableProperty]
        private bool showInvalidUriError;
        [ObservableProperty]
        private bool showAddServerError;

        [ICommand]
        public void EnterNewServer()
        {
            ShowAddControls = true;
            ShowAddButton = false;
        }
        [ICommand]
        public async Task AddNewServerAsync()
        {
            var newserver = new Server();
            newserver.Alias = serverAlias;
            newserver.Address = serverAddress;
            try
            {
                Uri uriTest = new Uri(newserver.Address);

            }
            catch (Exception ex)
            {
                ShowInvalidUriError = true;
                return;
            }


            try
            {
                var test = await httpClient.GetAsync($"{newserver.Address}/api/events");
                if (test.StatusCode == HttpStatusCode.OK)
                {
                    ShowAddServerError = false;
                }
            }
            catch (Exception ex)
            {
                ShowAddServerError = true;
                return;
            }



            ShowInvalidUriError = false;

            Servers.Add(newserver);

            ResetPage();
            var json = JsonConvert.SerializeObject(Servers);
            Preferences.Set(Constants.RecentlyUsedServers, json);
            if (Servers.Count == 1)
            {
                Preferences.Set(Constants.CurrentServer, Servers[0].Address);
                await Shell.Current.GoToAsync("//HomePage");
            }

        }
        [ICommand]
        private void OnCancel()
        {
            ResetPage();
        }

        [ICommand]
        public void ClearServers()
        {
            Servers.Clear();

            Preferences.Remove(Constants.CurrentServer);
            Preferences.Remove(Constants.RecentlyUsedServers);
        }

        [ICommand]
        public async void SetServerAsync(Server s)
        {


            Preferences.Set(Constants.CurrentServer, s.Address);
            await Shell.Current.GoToAsync($"//{nameof(HomePage)}");

        }
        private void loadServers()
        {
            var listServers = Preferences.Get(Constants.RecentlyUsedServers, null);
            if (listServers == null)
            {
                return;
            }

            var temp = JsonConvert.DeserializeObject<List<Server>>(listServers);
            foreach (var server in temp)
            {
                Servers.Add(new Server() { Alias = server.Alias, Address = server.Address });
            }
        }
        private void ResetPage()
        {
            ShowAddControls = false;
            ShowAddButton = true;
            ServerAlias = null;
            ServerAddress = null;
        }
        internal async Task OnAppearingAsync()
        {
            if (Servers.Count == 0)
            {
                await Application.Current.MainPage.DisplayAlert("No Server Set", "There needs to be a server set in format\n\nAlias: Any Name \nAddress: https://my-server-address", "Ok");
            }
        }


    }
}
