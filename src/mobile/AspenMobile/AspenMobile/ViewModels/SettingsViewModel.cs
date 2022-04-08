using AspenMobile.Models;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class SettingsViewModel : ObservableObject
    {

        public ObservableCollection<Server> Servers { get; }
        public SettingsViewModel()
        {
            Title = "Settings";
            ShowAddControls = false;
            ShowAddButton = true;
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

        [ICommand]
        public void EnterNewServer()
        {
            ShowAddControls = true;
            ShowAddButton = false;
        }
        [ICommand]
        public void AddNewServer()
        {
            var newserver = new Server();
            newserver.Alias = serverAlias;
            newserver.Address = serverAddress;
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
            Preferences.Clear("servers");
        }
        [ICommand]
        public void SetServer()
        {
            ///we need make changes
            Preferences.Clear("use_server");
            Preferences.Set("use_server", Address);
        }
        private void loadServers()
        {
            var listServers = Preferences.Get("servers", "");
            var temp = JsonConvert.DeserializeObject<List<Server>>(listServers);
            foreach (var server in temp)
            {
                Servers.Add(new Server() { Alias = server.Alias, Address = server.Address });
            }
        }


    }
}
