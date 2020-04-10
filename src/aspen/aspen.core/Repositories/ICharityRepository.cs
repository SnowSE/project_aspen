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
        IEnumerable<string> GetDomains();
        Task Update(Charity charity);
        Task<InternalResult<Charity>> GetById(Guid charityId);
        Task<InternalResult<Charity>> GetByDomain(Domain Domain);
        Task<InternalResult<bool>> Delete(Charity charity);
    }
}