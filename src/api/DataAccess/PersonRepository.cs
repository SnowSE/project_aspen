using Api.DbModels;
using Api.DtoModels;
using Api.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataAccess{
    public class PersonRepository : IPersonRepository
    {
        private readonly AspenContext _context;

        public PersonRepository(AspenContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // public bool PersonExists(string ID)
        // {
        //     return _context.Persons.Any(e => e.ID == ID);
        // }
        public async Task<Person> Add(DtoPerson dtoPerson)
        {
            var dbPerson = new DbPerson(){
                ID = Guid.NewGuid(),
                Name = dtoPerson.Name,
                Bio = dtoPerson.Bio
            };
            var returnedValue = await _context.Persons.AddAsync(dbPerson);
            return new Person(dbPerson.ID.ToString(), dbPerson.Name);
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
            return new Person("1", "George");
        }
    }
}