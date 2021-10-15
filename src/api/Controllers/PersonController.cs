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
        public async Task<ActionResult<DtoEvent>> GetByID(string id)
        {  
           return Ok(await personRepository.GetByID(id));
        }

        [HttpPost]
        public async Task<ActionResult<DtoPerson>> Add([FromBody] DtoPerson dtoPerson)
        {
            var person = await personRepository.Add(dtoPerson); 
            return Ok(mapper.Map<DtoPerson>(person));
        }

        // [HttpPut]
        // public  async Task<IActionResult> Edit([FromBody] DtoPerson e)
        // {
          
        // }


        // [HttpDelete]
        // public async Task<IActionResult> Delete(string ID)
        // {
            
        // }

    }
}
