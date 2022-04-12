using AspenMobile.ViewModels;
using Xamarin.Forms;

namespace AspenMobile.Views
{
    public partial class LoginPage : ContentPage
    {
        private readonly LoginViewModel viewModel;

        public LoginPage()
        {
            InitializeComponent();
            BindingContext = viewModel = (LoginViewModel)AppShell.Current.BindingContext;
        }

        protected override async void OnAppearing()
        {
            await viewModel.OnAppearingAsync();
        }
    }
}