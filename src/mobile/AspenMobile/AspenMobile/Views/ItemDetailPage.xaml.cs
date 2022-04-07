using AspenMobile.ViewModels;
using System.ComponentModel;
using Xamarin.Forms;

namespace AspenMobile.Views
{
    public partial class ItemDetailPage : ContentPage
    {
        public ItemDetailPage()
        {
            InitializeComponent();
            BindingContext = new ItemDetailViewModel();
        }
    }
}