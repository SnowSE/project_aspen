using System.Collections.Generic;
using System.Threading.Tasks;
using Aspen.Core.Models;

namespace Aspen.Core.Repositories
{
    public interface ICharityRepository
    {
        Task CreateCharity(Charity charity);
        Task<IEnumerable<Charity>> GetAll();
    }
}