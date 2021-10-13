using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Security.Claims;

namespace Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/[controller]")]
    public class AdminController : ControllerBase
    {
        [HttpGet]
        [Authorize(Roles = "admin-aspen")]
        public IEnumerable<UserClaim> Get() => User.Claims.Select(c => new UserClaim(c.Type.ToString(), c.Value.ToString()));
    }

    public record UserClaim(string claim, string value);
}
