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

        [HttpGet]
        public async Task<ActionResult<DtoRegistration>> GetByID(long id)
        {
            try
            {
                var registration = await registrationRepository.GetByIdAsync(id);
                return mapper.Map<DtoRegistration>(registration);
            }
            catch (NotFoundException<Registration>)
            {
                return NotFound("Unable to find requested registration.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<DtoRegistration>> Add([FromBody] DtoRegistration dtoRegistration)
        {
            if (ModelState.IsValid)
            {
                var registration = await registrationRepository.AddRegistrationAsync(dtoRegistration);
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

        [HttpPut]
        public async Task<ActionResult<DtoRegistration>> Edit([FromBody] DtoRegistration dtoRegistration)
        {
            if (ModelState.IsValid)
            {
                var registration = await registrationRepository.EditRegistrationAsync(dtoRegistration);
                return mapper.Map<DtoRegistration>(registration);
            }
            return BadRequest();
        }
    }
}