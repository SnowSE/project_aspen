using AspenMobile.ViewModels;
using System;
using System.ComponentModel;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace AspenMobile.Views
{
    public partial class HomePage : ContentPage
    {
        public HomePage()
        {
            InitializeComponent();
            BindingContext = new HomeViewModel(); 
        }

        private void CollectionView_Scrolled(object sender, ItemsViewScrolledEventArgs e)
        {

        }
    }
}