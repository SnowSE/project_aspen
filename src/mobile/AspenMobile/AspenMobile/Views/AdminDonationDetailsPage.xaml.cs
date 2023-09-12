using AspenMobile.ViewModels;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace AspenMobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class AdminDonationDetailsPage : ContentPage
    {
        public AdminDonationDetailsPage()
        {
            InitializeComponent();
            BindingContext = new AdminDonationDetailsViewModel();
        }
    }
}