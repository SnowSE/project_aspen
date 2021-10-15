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
        private readonly ITeamRepository _teamRepository;
        private readonly IMapper _mapper;

        public TeamController(ITeamRepository TeamRepository, IMapper mapper)
        {
            _mapper = mapper;
            _teamRepository = TeamRepository;
        }
        /*
                [HttpGet("all")]
                public async Task<IEnumerable<DtoTeam>> GetAllTeams()
                {
                    var Teams = await _teamRepository.GetTeamsAsync();
                    return _mapper.Map<IEnumerable<DtoTeam>>(Teams);
                }*/

        [HttpGet]
        public async Task<ActionResult<DtoTeam>> GetTeamByID(string TeamID)
        {

            if (_teamRepository.TeamExists(TeamID))
            {
                var dbTeam = await _teamRepository.GetTeamAsync(TeamID);

                return _mapper.Map<DtoTeam>(dbTeam);
            }
            else
            {
                return BadRequest("Team id does not exist");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTeam([FromBody] DtoTeam e)
        {

            if (ModelState.IsValid)
            {
                if (!_teamRepository.TeamExists(e.ID))
                {
                    var dbTeam = _mapper.Map<DbTeam>(e);
                    await _teamRepository.AddTeamAsync(dbTeam);
                    return Ok();
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
                var dbTeam = _mapper.Map<DbTeam>(e);
                await _teamRepository.EditTeamAsync(dbTeam);
                return Ok();
            }
            return BadRequest();
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteTeam(string TeamID)
        {
            if (_teamRepository.TeamExists(TeamID))
            {
                await _teamRepository.DeleteTeamAsync(TeamID);
                return Ok();
            }
            else
            {
                return BadRequest("Team id does not exist");
            }

        }
    }
}