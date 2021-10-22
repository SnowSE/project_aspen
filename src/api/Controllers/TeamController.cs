using Api.DataAccess;
using Api.DbModels;
using Api.DtoModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aspen.Api.Controllers
{
    [Route("api/teams")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository teamRepository;
        private readonly IMapper mapper;

        public TeamController(ITeamRepository teamRepository, IMapper mapper)
        {
            this.teamRepository = teamRepository;
            this.mapper = mapper;
        }

        [HttpGet("{eventId?}")]
        public async Task<IEnumerable<DtoTeam>> GetAllTeams(long? eventId)
        {
            if(eventId == null)
                return await teamRepository.GetTeamsAsync();
            return await teamRepository.GetTeamsByEventIdAsync(eventId.Value);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DtoTeam>> GetByID(long id)
        {

            if (teamRepository.TeamExists(id))
            {
                return await teamRepository.GetTeamByIdAsync(id);
            }
            else
            {
                return BadRequest("Team id does not exist");
            }
        }

        [HttpPost]
        public async Task<ActionResult<DtoTeam>> Add([FromBody] DtoTeam team, long eventId)
        {
            if (ModelState.IsValid)
            {
                var newTeam = await teamRepository.AddAsync(team, eventId);
                return mapper.Map<DtoTeam>(newTeam);
            }
            return BadRequest("Team object is not valid");
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] DtoTeam team)
        {
            if (ModelState.IsValid)
            {
                await teamRepository.EditTeamAsync(team);
                return Ok("Team edit was successful");
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            if (teamRepository.TeamExists(id))
            {
                await teamRepository.DeleteTeamAsync(id);
                return Ok("Delete Team was successful");
            }
            else
            {
                return BadRequest("Team id does not exist");
            }
        }
    }
}