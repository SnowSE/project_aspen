using System;
using System.Windows.Input;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public class AboutViewModel 
    {
        public AboutViewModel()
        {
            OpenWebCommand = new Command(async () => await Browser.OpenAsync("https://aka.ms/xamarin-quickstart"));
        }
        public ICommand OpenWebCommand { get; }
    }
}