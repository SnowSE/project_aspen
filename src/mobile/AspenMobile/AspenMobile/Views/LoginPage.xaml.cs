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
            BindingContext = viewModel = new LoginViewModel();
        }

        protected override async void OnAppearing()
        {
            await viewModel.OnAppearingAsync();
        }
    }
}