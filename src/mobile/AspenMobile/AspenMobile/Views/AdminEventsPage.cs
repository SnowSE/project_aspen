using AspenMobile.ViewModels;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace AspenMobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class AdminEventsPage : ContentPage
    {
        private readonly AdminEventsPage viewModel;
        public AdminEventsPage()
        {
            InitializeComponent();
            BindingContext = new AdminEventsViewModel();
        }

        /*        protected override async void OnAppearing()
                {
                    await viewModel.OnAppearingAsync();
                }*/
    }
}