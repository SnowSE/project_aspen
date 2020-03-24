using System.Threading.Tasks;
using Aspen.Api.Models;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Aspen.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
            return StatusReturn.Success(charity);
        }
    }
}