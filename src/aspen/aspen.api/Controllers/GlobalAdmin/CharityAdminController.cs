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
        public async Task<ApiResult> GetAll()
        {
            var allCharities = await charityRepository.GetAll();
            return ApiResult.Success(allCharities);
        }

        [HttpGet]
        public async Task<ApiResult> Get(Guid charityId) =>
            await charityId
                .ValidateFunction(async id => await charityRepository.GetById(id))
                .ReturnApiResult();
        

        [HttpPost]
        public async Task<ApiResult> Create([FromBody]Charity charity)
        {
            charity = charity.UpdateId(Guid.NewGuid());
            await charityRepository.Create(charity);
            var result = await charityRepository.GetByDomain(charity.Domains.First());
            await themeRepository.Create(Theme.Default(), result.State.ConnectionString);
            return ApiResult.Success(null);
        }

        [HttpPost]
        public async Task<ApiResult> Update([FromBody]Charity charity)
        {
            await charityRepository.Update(charity);
            return ApiResult.Success(null);
        }

        [HttpPost]
        public async Task<ApiResult> Delete([FromBody]Charity charity) =>
            await charity
                .ValidateFunction(validateCharity)
                .ApplyAsync(charityRepository.Delete)
                .ReturnApiResult();
        
        
        private InternalResult<Charity> validateCharity(Charity charity)
        {
            return InternalResult<Charity>.Success(charity);
        }

    }
}