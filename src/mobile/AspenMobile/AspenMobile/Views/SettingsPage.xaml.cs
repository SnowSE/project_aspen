using AspenMobile.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace AspenMobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SettingsPage : ContentPage
    {
        private readonly SettingsViewModel viewModel;
        public SettingsPage()
        {
            InitializeComponent();
            BindingContext = viewModel = new SettingsViewModel();
        }
        protected override async void OnAppearing()
        {
            await viewModel.OnAppearingAsync();
        }
    }
}