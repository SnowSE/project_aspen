using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Aspen.Core.Models;

namespace Aspen.Core.Repositories
{
    public interface ICharityRepository
    {
        Task Create(Charity charity);
        Task<IEnumerable<Charity>> GetAll();
        IEnumerable<string> GetSubDomains();
        Task Update(Charity charity);
        Task<Charity> GetById(Guid charityId);
        Task<Charity> GetByName(string charityName);
        Task Delete(Charity charity);
    }
}