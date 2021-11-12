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
        private readonly IPersonRepository personRepository;

        private IRegistrationRepository registrationRepository { get; }
        public IMapper mapper { get; }
        private string getModelStateErrorMessage() =>
            string.Join(" | ",
                ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                );

        public RegistrationController(IRegistrationRepository registrationRepository, IPersonRepository personRepository, IMapper mapper)
        {
            this.registrationRepository = registrationRepository;
            this.personRepository = personRepository;
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DtoRegistration>> GetByID(long id)
        {
            if (!await registrationRepository.ExistsAsync(id))
                return NotFound("Registration id does not exist");

            var registration = await registrationRepository.GetByIdAsync(id);
            return mapper.Map<DtoRegistration>(registration);

        }

        [HttpPost]
        public async Task<ActionResult<DtoRegistration>> Add([FromBody] DtoRegistration dtoRegistration)
        {
            if (!ModelState.IsValid)
                return BadRequest(getModelStateErrorMessage());

            var registration = await registrationRepository.AddAsync(dtoRegistration);
            return mapper.Map<DtoRegistration>(registration);
        }

        [HttpPost("/link/{registrationId}/{personId}")]
        public async Task<ActionResult<DtoRegistration>> LinkPersonRegistration(long registrationId, long personId)
        {
            var registration = await registrationRepository.GetByIdAsync(registrationId);
            if (registration == null)
                return NotFound("Invalid registration id");

            var person = await personRepository.GetByIDAsync(personId);
            if (person == null)
                return NotFound("Invalid person id");

            var updatedRegistration = await registrationRepository.LinkPersonToRegistrationAsync(registrationId, personId);
            return mapper.Map<DtoRegistration>(updatedRegistration);
        }

        [HttpPut]
        public async Task<ActionResult<DtoRegistration>> Edit([FromBody] DtoRegistration dtoRegistration)
        {
            if (!ModelState.IsValid)
                return BadRequest(getModelStateErrorMessage());

            if (!await registrationRepository.ExistsAsync(dtoRegistration.ID))
                return NotFound("Registration id does not exist");

            var registration = await registrationRepository.EditAsync(dtoRegistration);
            return mapper.Map<DtoRegistration>(registration);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            if (!await registrationRepository.ExistsAsync(id))
                return NotFound("Registration id does not exist");

            await registrationRepository.DeleteAsync(id);
            return Ok();
        }
    }
}