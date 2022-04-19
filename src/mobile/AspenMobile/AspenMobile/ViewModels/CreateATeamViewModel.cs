using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;
using AspenMobile.GlobalConstants;
using Xamarin.Essentials;

namespace AspenMobile.ViewModels
{
    public partial class CreateATeamViewModel
    {

        public CreateATeamViewModel()
        {
            var test = Preferences.Get(Constants.CurrentEventId, null);
        }
    }
}
