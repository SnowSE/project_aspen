using Api.DtoModels;
using RestSharp;
using System.Threading.Tasks;

namespace Tests.Steps
{
    public class AspenApi
    {
        public AspenApi()
        {
            Client = new RestClient("http://127.0.0.1:" + Hooks.Hooks.ExposedPort);
            Client.ThrowOnAnyError = true;
        }

        public RestClient Client { get; }

        public async Task<DtoPerson> CreatePersonAsync(DtoPerson person)
         {
            var request = new RestRequest("api/person/").AddJsonBody(person);
            return await Client.PostAsync<DtoPerson>(request);
        }

        public IRestResponse GetTeamsByEvent(int eventId) =>
            Client.Get(new RestRequest($"api/teams/event/{eventId}"));
    }
}