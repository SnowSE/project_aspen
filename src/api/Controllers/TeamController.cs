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

        public TeamController(ITeamRepository teamRepository)
        {
            this.teamRepository = teamRepository;
        }

        [HttpGet("{eventId?}")]
        public async Task<IEnumerable<DtoTeam>> GetAllTeams(long? eventId)
        {
            if(eventId == null)
                return await teamRepository.GetTeamsAsync();
            return await teamRepository.GetTeamsByEventIdAsync(eventId.Value);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DtoTeam>> GetTeamByID(long id)
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
        public async Task<IActionResult> AddTeam([FromBody] DtoTeam team, long eventID)
        {

            if (ModelState.IsValid)
            {
                if (!teamRepository.TeamExists(team.ID))
                {
                    await teamRepository.AddTeamAsync(team, eventID);
                    return Ok("Team added successfully");
                }
                else
                {
                    return BadRequest("Team already exists");
                }
            }
            return BadRequest("Team object is not valid");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTeam([FromBody] DtoTeam team, long id)
        {
            if (ModelState.IsValid)
            {
                await teamRepository.EditTeamAsync(team);
                return Ok("Team edit was successful");
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(long id)
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