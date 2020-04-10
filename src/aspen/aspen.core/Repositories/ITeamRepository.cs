using System.Collections.Generic;
using System.Threading.Tasks;
using Aspen.Core.Models;

namespace Aspen.Core.Repositories
{
    public interface ITeamRepository
    {
        Task<Result<bool>> Create(Team team, Charity charity);
        Task<Result<bool>> Delete(Team team, Charity charity);
        Task<Result<IEnumerable<Team>>> GetByCharity(Charity charity);
        Task<Result<Team>> Update(Team team, Charity charity);
    }
}