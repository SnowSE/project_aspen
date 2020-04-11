using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Aspen.Core.Models;

namespace Aspen.Core.Repositories
{
    public interface ICharityRepository
    {
        Task<Result<Charity>> Create(Charity charity);
        Task<IEnumerable<Charity>> GetAll();
        IEnumerable<string> GetDomains();
        Task<Result<Charity>> Update(Charity charity);
        Task<Result<Charity>> GetById(Guid charityId);
        Task<Result<Charity>> GetByDomain(Domain Domain);
        Task<Result<bool>> Delete(Charity charity);
    }
}