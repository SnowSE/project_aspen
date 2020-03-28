using System.Threading.Tasks;
using Aspen.Api.Models;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using System.Linq;
using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;

namespace Aspen.Api.Controllers
{
    [Route("admin/charity/{action}")]
    public class CharityAdminController : ControllerBase
    {
        private readonly ICharityRepository charityRepository;
        private readonly IThemeRepository themeRepository;

        public CharityAdminController(
            ICharityRepository charityRepository,
            IThemeRepository themeRepository)
        {
            this.charityRepository = charityRepository;
            this.themeRepository = themeRepository;
            var domains = new List<Domain>{new Domain("localhost")};
            var charity = new Charity(Guid.NewGuid(),"kylers angry penguins","this is penguins",domains);
            this.CreateCharity(charity);
        }

        [HttpGet]
        public async Task<StatusReturn> GetAll()
        {
            var allCharities = await charityRepository.GetAll();
            return StatusReturn.Success(allCharities);
        }

        [HttpGet]
        public async Task<StatusReturn> Get(Guid charityId)
        {
            var charity = await charityRepository.GetById(charityId);
            return StatusReturn.Success(charity);
        }
        
        private async Task<StatusReturn> CreateCharity(Charity charity)
        {
            await charityRepository.Create(charity);
            var dbCharity = await charityRepository.GetByDomain(charity.Domains.First());
            await themeRepository.Create(Theme.Default(dbCharity.CharityId));
            return StatusReturn.Success(null);
        }

        [HttpPost]
        public async Task<StatusReturn> Create([FromBody]Charity charity)
        {
            await charityRepository.Create(charity);
            var dbCharity = await charityRepository.GetByDomain(charity.Domains.First());
            await themeRepository.Create(Theme.Default(dbCharity.CharityId));
            return StatusReturn.Success(null);
        }

        [HttpPost]
        public async Task<StatusReturn> Update([FromBody]Charity charity)
        {
            await charityRepository.Update(charity);
            return StatusReturn.Success(null);
        }

        [HttpDelete]
        public async Task<StatusReturn> Delete([FromBody]Charity charity)
        {
            await charityRepository.Delete(charity);
            return StatusReturn.Success(null);
        }

    }
}