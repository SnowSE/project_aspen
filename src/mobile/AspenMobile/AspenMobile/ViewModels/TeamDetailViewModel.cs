using AspenMobile.Models;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public class TeamDetailViewModel : ObservableObject
    {
        public ObservableCollection<Team> TeamDetailsList { get; }

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