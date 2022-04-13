using Microsoft.Toolkit.Mvvm.ComponentModel;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    public partial class TeamDetailViewModel : ObservableObject
    {
        public ObservableCollection<DtoTeam> TeamInfoList { get; }

        public TeamDetailViewModel()
        {
           
        }

        [ObservableProperty]
        private string teamName;
        [ObservableProperty]
        private long teamId;
        [ObservableProperty]
        private string teamDescription;
        [ObservableProperty]
        private string mainImage;
        [ObservableProperty]
        private long ownerID;
        [ObservableProperty]
        private long eventID;
        [ObservableProperty]
        private decimal donationTarget;


    }
}