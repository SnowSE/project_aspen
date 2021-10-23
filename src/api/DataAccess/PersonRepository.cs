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
        Task<Person> AddAsync(string name, string bio, string authID);
        Task DeleteAsync(long id);
        Task<Person> EditAsync(Person e);
        Task<Person> GetByIDAsync(long id);
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
            var dbPerson = new DbPerson()
            {
                Name = name,
                Bio = bio
            };
            return await addDBPersonAsync(dbPerson);
        }

        public async Task<Person> AddAsync(string name, string bio, string authID)
        {
            var dbPerson = new DbPerson()
            {
                Name = name,
                Bio = bio,
                AuthID = authID,
            };
            return await addDBPersonAsync(dbPerson);
        }

        private async Task<Person> addDBPersonAsync(DbPerson dbPerson)
        {
            await context.Persons.AddAsync(dbPerson);
            await context.SaveChangesAsync();
            return mapper.Map<Person>(dbPerson);
        }

        public async Task DeleteAsync(long id)
        {
            var person = await context.Persons.FindAsync(id);
            if (person == null)
            {
                throw new NotFoundException<Person>($"Person ID: {id} not found");
            }
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

        public async Task<Person> GetByIDAsync(long id)
        {
            var dbPerson = await context.Persons.FindAsync(id);
            if (dbPerson == null)
            {
                throw new NotFoundException<Person>($"Person ID: {id} not found");
            }
            return mapper.Map<Person>(dbPerson);
        }
    }
}