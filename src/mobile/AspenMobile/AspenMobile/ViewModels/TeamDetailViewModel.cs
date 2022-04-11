using Microsoft.Toolkit.Mvvm.ComponentModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public class TeamDetailViewModel : ObservableObject
    {
        public TeamDetailViewModel()
        {
           
        }

        [ObservableProperty]
        private string teamName;
        [ObservableProperty]
        private int teamId;
        [ObservableProperty]
        private string teamDescription;
        [ObservableProperty]
        private string mainImage;
        [ObservableProperty]
        private int ownerID;
        [ObservableProperty]
        private int eventID;
        [ObservableProperty]
        private double donationTarget;
    }
}