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

        public TeamController(ITeamRepository TeamRepository, IMapper mapper)
        {
            this.mapper = mapper;
            teamRepository = TeamRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<DtoTeam>> GetAllTeams()
        {
            var teams = await teamRepository.GetTeamsAsync();
            return mapper.Map<IEnumerable<DbTeam>, IEnumerable<DtoTeam>>(teams);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DtoTeam>> GetTeamByID(string id)
        {

            if (teamRepository.TeamExists(id))
            {
                var dbTeam = await teamRepository.GetTeamByIdAsync(id);

                return mapper.Map<DtoTeam>(dbTeam);
            }
            else
            {
                return BadRequest("Team id does not exist");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTeam([FromBody] DtoTeam e, string eventID)
        {

            if (ModelState.IsValid)
            {
                if (!teamRepository.TeamExists(e.ID))
                {
                    var dbTeam = mapper.Map<DbTeam>(e);
                    await teamRepository.AddTeamAsync(dbTeam, eventID);
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
        public async Task<IActionResult> EditTeam([FromBody] DtoTeam e, string id)
        {
            if (ModelState.IsValid)
            {
                var dbTeam = mapper.Map<DbTeam>(e);
                await teamRepository.EditTeamAsync(dbTeam);
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
            var dbEventTeam = await teamRepository.GetEventTeamByIdAsync(id, eventID);

            return mapper.Map<DtoTeam>(dbEventTeam);
            
    
        }

        [HttpGet("getteams")]
        public async Task<IEnumerable<DtoTeam>> GetEventTeams(string eventID)
        {
            var dbEventTeams = await teamRepository.GetEventTeamsAsync(eventID);
            return mapper.Map<IEnumerable<DbTeam>, IEnumerable<DtoTeam>>(dbEventTeams);
        }
    }
}