using AspenMobile.GlobalConstants;
using IdentityModel.OidcClient;
using Microsoft.Extensions.Logging;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace AspenMobile.ViewModels
{
    [QueryProperty(nameof(EventId), nameof(EventId))]
    public partial class AdminDonationDetailsViewModel : ObservableObject
    {
        //private readonly HttpClient httpClient = new();
        //[ObservableProperty]
        //public int donation;
        public AdminDonationDetailsViewModel()
        {
            DisplayDonationAsync();
            current = Preferences.Get(Constants.CurrentServer, null) ?? throw new ArgumentNullException("Current Server not set");
            eventId = Preferences.Get(Constants.CurrentEventId, -1L);
            if (eventId < 0)
                throw new ArgumentNullException(nameof(eventId));
        }

        public long eventId;
        private string current;
        public LoginResult _result;

        public OidcClient client;

        [ObservableProperty]
        private string errorMessage;
        [ObservableProperty]
        public ObservableCollection<DtoDonation> donations = new ObservableCollection<DtoDonation>();

        public async void DisplayDonationAsync()
        {
            var httpClient = new HttpClient();
            var accessToken = await SecureStorage.GetAsync(Constants.AccessToken) ?? throw new Exception("Access token not found");
            if (accessToken == null)
            {
                _result = await client.LoginAsync(new LoginRequest());
                if (_result.IsError)
                {
                    ErrorMessage = _result.Error;
                    return;
                }
                accessToken = _result.AccessToken;
                await SecureStorage.SetAsync(Constants.AccessToken, accessToken);
            }
            if (httpClient.DefaultRequestHeaders.Authorization == null)
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            }

            var uri = new Uri($"{current}/api/Admin/donation/{eventId}");
            var donations = await httpClient.GetFromJsonAsync<IEnumerable<DtoDonation>>(uri);
            foreach (var donation in donations)
            {
                Donations.Add(donation);
                Console.WriteLine(Donations.Count);
            }

        }
    }
}
