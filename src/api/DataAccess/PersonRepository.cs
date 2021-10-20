using Api.DbModels;
using Api.Exceptions;
using Api.Models;
using Api.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface IPersonRepository
    {
        Task<Person> AddAsync(string name, string bio);
        Task DeleteAsync(string ID);
        Task<Person> EditAsync(Person e);
        Task<Person> GetByIDAsync(string ID);
    }

    public class PersonRepository : IPersonRepository
    {
        private readonly AspenContext context;
        private readonly IMapper mapper;

        public PersonRepository(AspenContext context, IMapper mapper)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.mapper = mapper;
        }

        public async Task<Person> AddAsync(string name, string bio)
        {
            var dbPerson = new DbPerson(){
                ID = Guid.NewGuid().ToString(),
                Name = name,
                Bio = bio
            };
            await context.Persons.AddAsync(dbPerson);
            await context.SaveChangesAsync();
            return mapper.Map<Person>(dbPerson);
        }

        public async Task DeleteAsync(string ID)
        {
            var person = await context.Persons.FindAsync(ID);
            context.Persons.Remove(person);
            await context.SaveChangesAsync();
        }

        public async Task<Person> EditAsync(Person person)
        {
            var dbPerson = mapper.Map<DbPerson>(person);
            context.Update(dbPerson);
            await context.SaveChangesAsync();
            return person;
        }

        public async Task<Person> GetByIDAsync(string ID)
        {
            var dbPerson = await context.Persons.FindAsync(ID);
            if(dbPerson == null)
            {
                throw new NotFoundException<Person>($"Person ID: {ID} not found");
            }
            return mapper.Map<Person>(dbPerson);
        }
    }
}