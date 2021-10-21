using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DtoModels;
using AutoMapper;
using Api.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using Api.Exceptions;
using Api.Models.Entities;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {

        private IRegistrationRepository registrationRepository { get; }
        public IMapper mapper { get; }

        public RegistrationController(IRegistrationRepository registrationRepository, IMapper mapper)
        {
            this.registrationRepository = registrationRepository;
            this.mapper = mapper;
        }


        [HttpPost]
        public async Task<ActionResult<DtoRegistration>> Add([FromBody] DtoRegistration dtoRegistration)
        {

            if (ModelState.IsValid)
            {
                var ownerId = dtoRegistration.OwnerID;
                var teamId = dtoRegistration.TeamID;
                var registration = await registrationRepository.AddRegistrationAsync(teamId, ownerId);
                return mapper.Map<DtoRegistration>(registration);
            }
            else
            {
                var errorMessage = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));
                return BadRequest(errorMessage);
            }
        }
    }
}