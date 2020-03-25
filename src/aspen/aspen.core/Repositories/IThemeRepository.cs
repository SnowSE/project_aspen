using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Aspen.Core.Models;

namespace Aspen.Core.Repositories
{
    public interface IThemeRepository
    {
        Task Create(Theme theme);
        Task Delete(Guid charityId);
        Task<IEnumerable<Theme>> GetAll();
        Task<Theme> GetByCharityId(Guid charityId);
        Task Update(Theme theme);
    }
}