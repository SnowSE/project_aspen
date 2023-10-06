using AspenMobile.ViewModels;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace AspenMobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class CreateNewEventPage : ContentPage
    {
        public CreateNewEventPage()
        {
            InitializeComponent();
            BindingContext = new CreateNewEventViewModel();
        }
    }
}