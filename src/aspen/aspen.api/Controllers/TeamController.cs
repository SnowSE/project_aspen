using System;
using Aspen.Api.Http;
using Aspen.Core;
using Aspen.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Aspen.Api.Controllers
{
    [ApiController]
    [Route("{controller}/{action}")]
    public class TeamController : ControllerBase
    {
        [HttpGet]
        public StatusReturn GetByCharityId([FromQuery(Name = "CharityId")] Guid charityId)
        {
            return StatusReturn.Success(
                new Team(Guid.Empty, "Sample Team Name", "Description of sample Team")
            );
        }

        [HttpPost]
        public StatusReturn Create([FromBody] TeamCreateRequest request)
        {
            return StatusReturn.Success(
                new Team(Guid.Empty, "Sample Team Name", "Description of sample Team")
            );
        }

        [HttpPost]
        public StatusReturn Update([FromBody] Team team)
        {
            return StatusReturn.Success(null);
        }

        [HttpPost]
        public StatusReturn Delete([FromBody] Team team)
        {
            return StatusReturn.Success(null);
        }
    }
}