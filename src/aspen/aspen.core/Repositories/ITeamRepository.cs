using System.Collections.Generic;
using System.Threading.Tasks;
using Aspen.Core.Models;

namespace Aspen.Core.Repositories
{
    public interface ITeamRepository
    {
        Task<InternalResult<bool>> Create(Team team, Charity charity);
        Task<InternalResult<bool>> Delete(Team team, Charity charity);
        Task<InternalResult<IEnumerable<Team>>> GetByCharity(Charity charity);
        Task<InternalResult<Team>> Update(Team team, Charity charity);
    }
}