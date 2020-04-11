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
    public class AdminCharityController : ControllerBase
    {
        private readonly ICharityRepository charityRepository;
        private readonly IThemeRepository themeRepository;

        public AdminCharityController(
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
        public async Task<ApiResult> Create([FromBody]Charity charity) =>
            await charity
                .ValidateFunction(c => Result<Charity>.Success(c.UpdateId(Guid.NewGuid())))
                .ApplyAsync(charityRepository.Create)
                .ApplyAsync(async c => await themeRepository.Create(Theme.Default(), c.ConnectionString))
                .ReturnEmptyApiResult();


        [HttpPost]
        public async Task<ApiResult> Update([FromBody]Charity charity) =>
            await charity
                .ValidateFunction(c => Result<Charity>.Success(c))
                .ApplyAsync(charityRepository.Update)
                .ReturnEmptyApiResult();

        [HttpPost]
        public async Task<ApiResult> Delete([FromBody]Charity charity) =>
            await charity
                .ValidateFunction(validateCharity)
                .ApplyAsync(charityRepository.Delete)
                .ReturnApiResult();
        
        
        private Result<Charity> validateCharity(Charity charity)
        {
            return Result<Charity>.Success(charity);
        }

    }
}