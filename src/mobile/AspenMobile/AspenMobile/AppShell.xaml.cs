using AspenMobile.ViewModels;
using AspenMobile.Views;
using System;
using System.Collections.Generic;
using Xamarin.Forms;

namespace AspenMobile
{
    public partial class AppShell : Xamarin.Forms.Shell
    {
        public AppShell()
        {
            InitializeComponent();
            Routing.RegisterRoute(nameof(HomePage), typeof(HomePage));
            Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));
            Routing.RegisterRoute(nameof(SettingsPage), typeof(SettingsPage));
            Routing.RegisterRoute(nameof(EventPage), typeof(EventPage));
            Routing.RegisterRoute(nameof(CreateATeamPage), typeof(CreateATeamPage));
            Routing.RegisterRoute(nameof(CreateNewEventPage), typeof(CreateNewEventPage));
            Routing.RegisterRoute(nameof(EditEventPage), typeof(EditEventPage));

        }

        //private async void OnMenuItemClicked(object sender, EventArgs e)
        //{
        //    await Shell.Current.GoToAsync("//LoginPage");
        //}
    }
}
