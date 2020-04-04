using System;
using System.Threading.Tasks;
using Aspen.Api.Http;
using Aspen.Core;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Aspen.Api.Controllers
{
    [ApiController]
    [Route("{controller}/{action}")]
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository teamRepository;
        private readonly ICharityRepository charityRepository;

        public TeamController(
            ITeamRepository teamRepository,
            ICharityRepository charityRepository)
        {
            this.teamRepository = teamRepository;
            this.charityRepository = charityRepository;
        }

        [HttpGet]
        public async Task<StatusReturn> GetByCharityId([FromQuery(Name = "CharityId")] Guid charityId) =>
            await charityId
                .ValidateFunction(getValidCharity)
                .ApplyAsync(teamRepository.GetByCharity)
                .ReturnWithStatus();

        [HttpPost]
        public async Task<StatusReturn> Create([FromBody] TeamRequest request) =>
            await request
                .ValidateFunction(getValidCharity)
                .ApplyAsync(async c => 
                    await teamRepository.Create(request.team.UpdateId(Guid.NewGuid()), c))
                .ReturnWithStatus();
        
        [HttpPost]
        public async Task<StatusReturn> Update([FromBody] TeamRequest request) =>
            await request
                .ValidateFunction(getValidCharity)
                .ApplyAsync(async c => await teamRepository.Update(request.team, c))
                .ReturnWithStatus();

        [HttpPost]
        public async Task<StatusReturn> Delete([FromBody] TeamRequest request) =>
            await request
                .ValidateFunction(getValidCharity)
                .ApplyAsync(async c => await teamRepository.Delete(request.team, c))
                .ReturnWithStatus();

        private async Task<Result<Charity>> getValidCharity(TeamRequest request)
        {
            return await charityRepository.GetById(request.CharityId);
        }

        private async Task<Result<Charity>> getValidCharity(Guid charityId)
        {
            return await charityRepository.GetById(charityId);
        }
    }
}