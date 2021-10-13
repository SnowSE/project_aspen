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
        private readonly ILogger<AdminController> logger;

        public AdminController(ILogger<AdminController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = "admin-aspen")]
        public IEnumerable<IUserClaim> Get()
        {
            var userClaims = User.Claims.Select(c =>
            {
                IUserClaim claim = new UserClaim
                {
                    claim = c.Type.ToString(),
                    value = c.Value.ToString()
                };
                return claim;
            });
            return userClaims;
        }
    }

    public interface IUserClaim
    {
        public string claim { get; }
        public string value { get; }
    }
    public class UserClaim : IUserClaim
    {
        public string claim { get; set; }
        public string value { get; set; }
    }
}
