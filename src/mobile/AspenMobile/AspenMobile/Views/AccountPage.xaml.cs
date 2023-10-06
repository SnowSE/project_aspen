using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspenMobile.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace AspenMobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class AccountPage : ContentPage
    {
        private readonly AccountViewModel viewModel;
        public AccountPage()
        {
            InitializeComponent();
            BindingContext = viewModel = new AccountViewModel();
        }
        protected override async void OnAppearing()
        {
            await viewModel.OnAppearingAsync();
        }
    }
}