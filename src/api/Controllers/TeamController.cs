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
    [Route("api/[controller]")]
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

        [HttpGet("all")]
        public async Task<IEnumerable<DtoTeam>> GetAllTeams()
        {
            var Teams = await teamRepository.GetTeamsAsync();
            return mapper.Map<IEnumerable<DbTeam>, IEnumerable<DtoTeam>>(Teams);
        }

        [HttpGet]
        public async Task<ActionResult<DtoTeam>> GetTeamByID(string TeamID)
        {

            if (teamRepository.TeamExists(TeamID))
            {
                var dbTeam = await teamRepository.GetTeamAsync(TeamID);

                return mapper.Map<DtoTeam>(dbTeam);
            }
            else
            {
                return BadRequest("Team id does not exist");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTeam([FromBody] DtoTeam e, string EventID)
        {

            if (ModelState.IsValid)
            {
                if (!teamRepository.TeamExists(e.ID))
                {
                    var dbTeam = mapper.Map<DbTeam>(e);
                    await teamRepository.AddTeamAsync(dbTeam, EventID);
                    return Ok("Team added successfully");
                }
                else
                {
                    return BadRequest("Team already exists");
                }
            }
            return BadRequest("Team object is not valid");
        }

        [HttpPut]
        public async Task<IActionResult> EditTeam([FromBody] DtoTeam e)
        {
            if (ModelState.IsValid)
            {
                var dbTeam = mapper.Map<DbTeam>(e);
                await teamRepository.EditTeamAsync(dbTeam);
                return Ok("Team edit was successful");
            }
            return BadRequest();
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteTeam(string TeamID)
        {
            if (teamRepository.TeamExists(TeamID))
            {
                await teamRepository.DeleteTeamAsync(TeamID);
                return Ok("Delete Team was successful");
            }
            else
            {
                return BadRequest("Team id does not exist");
            }

        }
    }
}