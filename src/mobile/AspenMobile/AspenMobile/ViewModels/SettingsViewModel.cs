using AspenMobile.GlobalConstants;
using AspenMobile.Models;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using Microsoft.Toolkit.Mvvm.Input;
//using Microsoft.VisualStudio.PlatformUI;
using Newtonsoft.Json;
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
        [ObservableProperty]
        private string selectedServer;


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
            Preferences.Clear(Constants.RecentlyUsedServers);
        }

        [ICommand]
        public void SetServer(Server s)
        {

            //if (nameof(SettingsViewModel.Alias) == null)
            //  return;





            Preferences.Set(Constants.CurrentServer, s.Address);
            ///if ewe know what server then
            //else
            //foreach (var server in Servers)
            //{
            //    if (nameof(SettingsViewModel.Alias) == server.Alias)
            //    {


            //    }
            //}
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

        //[ICommand]

        //public void AliasTapped ()
        //{
        //    Preferences.Get("use_server", true);

        //}



    }
}
