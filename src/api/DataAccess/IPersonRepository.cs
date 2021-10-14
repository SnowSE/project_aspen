using Api.DtoModels;
using Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface IPersonRepository
    {
        Task<Person> Add(DtoPerson e);
        Task Delete(string ID);
        Task<Person> Edit(DtoPerson e);
        Task<Person> GetByID(string ID);
    }
}