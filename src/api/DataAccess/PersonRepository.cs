using Api.DbModels;
using Api.DtoModels;
using Api.Models;
using Api.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataAccess{
    public class PersonRepository : IPersonRepository
    {
        private readonly AspenContext _context;
        private readonly IMapper mapper;

        public PersonRepository(AspenContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            this.mapper = mapper;
        }

        // public bool PersonExists(string ID)
        // {
        //     return _context.Persons.Any(e => e.ID == ID);
        // }
        public async Task<Person> Add(DtoPerson dtoPerson)
        {
            var dbPerson = new DbPerson(){
                ID = Guid.NewGuid().ToString(),
                Name = dtoPerson.Name,
                Bio = dtoPerson.Bio
            };
            var returnedValue = await _context.Persons.AddAsync(dbPerson);
            return mapper.Map<Person>(dbPerson);
        }

        public Task Delete(string ID)
        {
            throw new System.NotImplementedException();
        }

        public Task<Person> Edit(DtoPerson e)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Person> GetByID(string ID)
        {
            var dbPerson = await _context.Persons.FindAsync(ID);
            if(dbPerson == null)
            {
                throw new PersonNotFoundException();
            }
            return mapper.Map<Person>(dbPerson);
        }
    }
}