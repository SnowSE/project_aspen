using System;
using System.Collections.Generic;
using System.Linq;
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
    public partial class EventsPage : ContentPage
    {
        private readonly EventsPage viewModel;
        public EventsPage()
        {
            InitializeComponent();
            BindingContext = new Events();
        }

/*        protected override async void OnAppearing()
        {
            await viewModel.OnAppearingAsync();
        }*/
    }
}