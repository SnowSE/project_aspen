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
    public class PersonController : ControllerBase
    {
        private readonly IPersonRepository personRepository;
        private readonly IMapper mapper;

        public PersonController(IPersonRepository personRepository, IMapper mapper)
        {
            this.mapper = mapper;
            this.personRepository = personRepository;
        }

        [HttpGet]
        public async Task<ActionResult<DtoPerson>> GetByID(long id)
        {
            try
            {
                var person = await personRepository.GetByIDAsync(id);
                return mapper.Map<DtoPerson>(person);
            }
            catch (NotFoundException<Person> e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<DtoPerson>> Add([FromBody] DtoPerson dtoPerson)
        {
            if (ModelState.IsValid)
            {
                if (string.IsNullOrEmpty(dtoPerson.AuthID))
                {
                    var person = await personRepository.AddAsync(dtoPerson.Name, dtoPerson.Bio);
                    return mapper.Map<DtoPerson>(person);
                }
                else
                {
                    var person = await personRepository.AddAsync(dtoPerson.Name, dtoPerson.Bio, dtoPerson.AuthID);
                    return mapper.Map<DtoPerson>(person);

                }
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
        public async Task<ActionResult<DtoPerson>> Edit([FromBody] DtoPerson dtoPerson)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var person = mapper.Map<Person>(dtoPerson);
                    var updatedPerson = await personRepository.EditAsync(person);
                    return mapper.Map<DtoPerson>(updatedPerson);
                }
            }
            catch { } //any exception will end in BadRequest
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            try
            {
                await personRepository.DeleteAsync(id);
                return Ok();
            }
            catch (NotFoundException<Person> e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
