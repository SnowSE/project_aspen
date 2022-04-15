using AspenMobile.GlobalConstants;
using AspenMobile.Models;
using AspenMobile.Views;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
//using Microsoft.VisualStudio.PlatformUI;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net;
using Xamarin.Essentials;
using Xamarin.Forms;
using System;
using System.Threading.Tasks;

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
        public async Task AddNewServer()
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






            ShowInvalidUriError = false;

            Servers.Add(newserver);

            ShowAddControls = false;
            ShowAddButton = true;
            var json = JsonConvert.SerializeObject(Servers);
            Preferences.Set("servers", json);

        }
        [ICommand]
        private async void OnCancel()
        {
            // This will pop the current page off the navigation stack
            await Shell.Current.GoToAsync("..");
        }

        [ICommand]
        public void ClearServers()
        {
            Servers.Clear();
            Preferences.Clear(Constants.RecentlyUsedServers);
        }

        [ICommand]
        public async void SetServerAsync(Server s)
        {
            try
            {
                var test = await httpClient.GetAsync($"{s.Address}/api/events");
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

            Preferences.Set(Constants.CurrentServer, s.Address);
            await Shell.Current.GoToAsync($"{nameof(HomePage)}");

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



    }
}
