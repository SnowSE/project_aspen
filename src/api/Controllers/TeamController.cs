﻿using Api.DataAccess;
using Api.DbModels;
using Api.DtoModels;
using Api.Exceptions;
using Api.Models.Entities;
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
        private string getModelStateErrorMessage() =>
            string.Join(" | ",
                ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                );

        public TeamController(ITeamRepository teamRepository, IMapper mapper)
        {
            this.teamRepository = teamRepository;
            this.mapper = mapper;
        }

        [HttpGet("{eventId?}")]
        public async Task<IEnumerable<DtoTeam>> GetAll(long? eventId)
        {
            if (eventId == null)
                return mapper.Map<IEnumerable<DtoTeam>>(await teamRepository.GetAllAsync());

            return mapper.Map<IEnumerable<DtoTeam>>(await teamRepository.GetByEventIdAsync(eventId.Value));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DtoTeam>> GetByID(long id)
        {
            if (!await teamRepository.ExistsAsync(id))
                return NotFound("Team id does not exist");
            return mapper.Map<DtoTeam>(await teamRepository.GetTeamByIdAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<DtoTeam>> Add([FromBody] DtoTeam dtoTeam, long eventId)
        {
            if (!ModelState.IsValid)
                return BadRequest(getModelStateErrorMessage());

            var team = mapper.Map<Team>(dtoTeam);
            var newTeam = await teamRepository.AddAsync(team, eventId);
            return mapper.Map<DtoTeam>(newTeam);

        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] DtoTeam dtoTeam)
        {
            if (!ModelState.IsValid)
                return BadRequest(getModelStateErrorMessage());

            var team = mapper.Map<Team>(dtoTeam);

            if (!await teamRepository.ExistsAsync(team.ID))
                return NotFound("Team id does not exist");

            await teamRepository.EditTeamAsync(team);
            return Ok("Team edit was successful");

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            if (!await teamRepository.ExistsAsync(id))
                return NotFound("Team id does not exist");

            await teamRepository.DeleteTeamAsync(id);
            return Ok();

        }
    }
}