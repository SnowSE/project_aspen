using AspenMobile.ViewModels;
using Xamarin.Forms;

namespace AspenMobile.Views
{
    public partial class HomePage : ContentPage
    {
        public HomePage()
        {
            InitializeComponent();
            var loginViewModel = (LoginViewModel)AppShell.Current.BindingContext;
            BindingContext = new HomeViewModel(loginViewModel);
        }

        private void CollectionView_Scrolled(object sender, ItemsViewScrolledEventArgs e)
        {

        }
    }
}