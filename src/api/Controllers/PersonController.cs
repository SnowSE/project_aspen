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
            var person = await personRepository.AddAsync(dtoPerson.Name, dtoPerson.Bio);
            return mapper.Map<DtoPerson>(person);
        }

        [HttpPut]
        public async Task<ActionResult<DtoPerson>> Edit([FromBody] DtoPerson dtoPerson)
        {
            var person = mapper.Map<Person>(dtoPerson);
            var updatedPerson = await personRepository.EditAsync(person);
            return mapper.Map<DtoPerson>(updatedPerson);
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(long ID)
        {
            await personRepository.DeleteAsync(ID);
            return Ok();
        }

    }
}
