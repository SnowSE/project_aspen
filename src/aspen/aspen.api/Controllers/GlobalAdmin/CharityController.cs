using System.Threading.Tasks;
using aspen.api.Models;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace aspen.api.Controllers
{
    public class CharityController : ControllerBase
    {
        private readonly ICharityRepository charityRepository;

        public CharityController(ICharityRepository charityRepository)
        {
            this.charityRepository = charityRepository;
        }
        [HttpGet]
        public async Task<StatusReturn> GetAll()
        {
            var allCharities = await charityRepository.GetAll();
            return StatusReturn.Success(allCharities);
        }

        [HttpGet]
        public async Task<StatusReturn> Get(int charityId)
        {
            var charity = await charityRepository.GetById(charityId);
            return StatusReturn.Success(charity);
        }

        [HttpPost]
        public async Task<StatusReturn> Create([FromBody]Charity charity)
        {
            await charityRepository.Create(charity);
            return StatusReturn.Success(null);
        }

        [HttpPost]
        public async Task<StatusReturn> Update([FromBody]Charity charity)
        {
            await charityRepository.Update(charity);
            return StatusReturn.Success(null);
        }

        [HttpDelete]
        public async Task<StatusReturn> Delete([FromBody]Charity charity)
        {
            await charityRepository.Delete(charity);
            return StatusReturn.Success(null);
        }

    }
}