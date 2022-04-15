using AspenMobile.ViewModels;
using AspenMobile.Views;
using System;
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
            Routing.RegisterRoute(nameof(HomePage), typeof(HomePage));
            Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));
            Routing.RegisterRoute(nameof(SettingsPage), typeof(SettingsPage));
            Routing.RegisterRoute(nameof(AdminDonationDetailsPage), typeof(AdminDonationDetailsPage));
            Routing.RegisterRoute(nameof(CreateATeamPage), typeof(CreateATeamPage));
            Routing.RegisterRoute(nameof(CreateNewEventPage), typeof(CreateNewEventPage));
            Routing.RegisterRoute(nameof(EditEventPage), typeof(EditEventPage));
            Routing.RegisterRoute(nameof(TeamPage), typeof(TeamPage));


        }
        protected override async void OnBindingContextChanged()
        {
            await viewModel.CheckTokenIsLiveAsync();
        }
        private async void OnMenuItemClicked(object sender, EventArgs e)
        {

            await viewModel.ToggleLoginLogoutAsync();
        }
    }
}
