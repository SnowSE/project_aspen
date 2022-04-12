using AspenMobile.ViewModels;
using AspenMobile.Views;
using System;
using System.Collections.Generic;
using Xamarin.Forms;

namespace AspenMobile
{
    public partial class AppShell : Xamarin.Forms.Shell
    {
        private LoginViewModel viewModel;
        public AppShell()
        {
            BindingContext = viewModel = new LoginViewModel();
            InitializeComponent();
            Routing.RegisterRoute(nameof(EventsPage), typeof(EventsPage));
            Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));
            Routing.RegisterRoute(nameof(SettingsPage), typeof(SettingsPage));
            Routing.RegisterRoute(nameof(EventPage), typeof(EventPage));

        }
        protected override async void OnBindingContextChanged()
        {
            await viewModel.CheckTokenIsLiveAsync();
        }
        private async void OnMenuItemClicked(object sender, EventArgs e)
        {

            await Shell.Current.GoToAsync("LoginPage");
        }
    }
}
