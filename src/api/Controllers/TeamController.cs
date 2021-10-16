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

        [HttpGet]
        public async Task<IEnumerable<DtoTeam>> GetAllTeams()
        {
            return await teamRepository.GetTeamsAsync();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DtoTeam>> GetTeamByID(string id)
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
        public async Task<IActionResult> AddTeam([FromBody] DtoTeam team, string eventID)
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
        public async Task<IActionResult> EditTeam([FromBody] DtoTeam team, string id)
        {
            if (ModelState.IsValid)
            {
                await teamRepository.EditTeamAsync(team);
                return Ok("Team edit was successful");
            }
            return BadRequest();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(string id)
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

        [HttpGet("getteam")]
        public async Task<ActionResult<DtoTeam>> GetEventTeamByID(string id, string eventID)
        {
            return await teamRepository.GetEventTeamByIdAsync(id, eventID);
        }

        [HttpGet("getteams")]
        public async Task<IEnumerable<DtoTeam>> GetEventTeams(string eventID)
        {
            return await teamRepository.GetEventTeamsAsync(eventID);
        }
    }
}