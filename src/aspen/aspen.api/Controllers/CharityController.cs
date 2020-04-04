using System;
using System.Threading.Tasks;
using Aspen.Core;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<StatusReturn> Get([FromQuery(Name = "domain")] string domain) =>
            await domain
                .ValidateFunction(validateDomain)
                .ApplyAsync(charityRepository.GetByDomain)
                .ReturnWithStatus();

        public async Task<StatusReturn> Get([FromQuery(Name = "CharityId")] Guid charityId) =>
            await charityId
                .ValidateFunction(validateCharityId)
                .ApplyAsync(charityRepository.GetById)
                .ReturnWithStatus();

        private Result<Domain> validateDomain(string domain)
        {
            try
            {
                var d = new Domain(domain);
                return Result<Domain>.Success(d);
            }
            catch(ArgumentException e)
            {
                return Result<Domain>.Failure(e.Message);
            }
        }

        [HttpGet]
        public async Task<StatusReturn> GetTheme([FromQuery(Name = "charityId")] Guid charityId) =>
            await charityId
                .ValidateFunction(id => Result<Guid>.Success(id))
                .ApplyAsync(charityRepository.GetById)
                .ApplyAsync(themeRepository.GetByCharity)
                .ReturnWithStatus();

        private Result<Guid> validateCharityId(Guid id) => Result<Guid>.Success(id);

        [HttpGet]
        public async Task<StatusReturn> GetHomePage([FromQuery(Name = "charityId")] Guid charityId)
        {
            const string loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
            return StatusReturn.Success(new HomePage(loremIpsum));
        }
    }
}