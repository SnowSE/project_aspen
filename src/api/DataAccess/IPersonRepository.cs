using Api.DtoModels;
using Api.Models;
using Api.Models.Entities;
using System.Collections.Generic;
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
}