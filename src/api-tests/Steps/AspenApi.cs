using Api.DtoModels;
using RestSharp;
using System.Threading.Tasks;

namespace Tests.Steps
{
    public class AspenApi
    {
        private readonly RestClient client;

        public AspenApi()
        {
            client = new RestClient("http://127.0.0.1:" + Hooks.Hooks.ExposedPort);
            client.ThrowOnAnyError = true;
        }

        public async Task<DtoPerson> CreatePersonAsync(DtoPerson person)
         {
            var request = new RestRequest("api/person/").AddJsonBody(person);
            return await client.PostAsync<DtoPerson>(request);
        }

        public IRestResponse GetTeamsByEvent(int eventId)
        {
            var request = new RestRequest($"api/teams/event/{eventId}");
            var response = client.Get(request);
            //return await client.GetAsync<ActionResult<IEnumerable<DtoTeam>>>(request);
            return response;
        }
    }
}