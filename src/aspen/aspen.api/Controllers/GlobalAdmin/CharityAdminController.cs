using System.Threading.Tasks;
using Aspen.Core.Repositories;
using System.Linq;
using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Aspen.Core;
using Aspen.Core.Models;

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
            var result = await charityRepository.GetByDomain(charity.Domains.First());
            await themeRepository.Create(Theme.Default(result.State.CharityId));
            return StatusReturn.Success(null);
        }

        [HttpPost]
        public async Task<StatusReturn> Create([FromBody]Charity charity)
        {
            await charityRepository.Create(charity);
            var result = await charityRepository.GetByDomain(charity.Domains.First());
            await themeRepository.Create(Theme.Default(result.State.CharityId));
            return StatusReturn.Success(null);
        }

        [HttpPost]
        public async Task<StatusReturn> Update([FromBody]Charity charity)
        {
            await charityRepository.Update(charity);
            return StatusReturn.Success(null);
        }

        [HttpPost]
        public async Task<StatusReturn> Delete([FromBody]Charity charity)
        {
            await charityRepository.Delete(charity);
            return StatusReturn.Success(null);
        }

    }
}