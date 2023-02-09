using RestSharp;
using System.Net.Http;

namespace Tests.Steps
{
    public class AspenApi
    {
        public AspenApi()
        {
            var baseUrl = "http://127.0.0.1:" + Hooks.TestHook.ExposedPort;
            RestClient = new RestClient(baseUrl);

            HttpClient = new HttpClient() { BaseAddress = new Uri(baseUrl) };
        }

        public RestClient RestClient { get; }
        public HttpClient HttpClient { get; }

        public async Task<DtoPerson> CreatePersonAsync(DtoPerson person)
        {
            var request = new RestRequest("api/person/").AddJsonBody(person);
            return await RestClient.PostAsync<DtoPerson>(request);
        }

        public RestResponse GetTeamsByEvent(int eventId) =>
            RestClient.Get(new RestRequest($"api/teams/event/{eventId}"));
    }
}