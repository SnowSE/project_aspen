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
        private readonly IThemeRepository themeRepository;

        public CharityController(
            ICharityRepository charityRepository,
            IThemeRepository themeRepository)
        {
            this.charityRepository = charityRepository;
            this.themeRepository = themeRepository;
        }

        [HttpGet]
        public async Task<StatusReturn> Get([FromQuery(Name = "domain")] string domain)
        {
            var charity = await charityRepository.GetByDomain(new Domain(domain));
            // Console.WriteLine(JsonConvert.SerializeObject(charity));
            return StatusReturn.Success(charity);
        }

        [HttpGet]
        public async Task<StatusReturn> GetTheme([FromQuery(Name = "charityId")] Guid charityId)
        {
            var theme = await themeRepository.GetByCharityId(charityId);
            return StatusReturn.Success(theme);
        }

        [HttpGet]
        public async Task<StatusReturn> GetHomePage([FromQuery(Name = "charityId")] Guid charityId)
        {
            return StatusReturn.Success(new HomePage("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
        }
    }
}