using System;
using System.Threading.Tasks;
using Aspen.Api.Models;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Aspen.Api.Controllers
{
    [ApiController]
    [Route("{controller}/{action}")]
    public class CharityController : ControllerBase
    {
        private readonly ICharityRepository charityRepository;

        public CharityController(ICharityRepository charityRepository)
        {
            this.charityRepository = charityRepository;
        }

        [HttpGet]
        public async Task<StatusReturn> Get([FromQuery(Name = "domain")] string domain)
        {
            var charity = await charityRepository.GetByDomain(new Domain(domain));
            // Console.WriteLine(JsonConvert.SerializeObject(charity));
            return StatusReturn.Success(charity);
        }
    }
}