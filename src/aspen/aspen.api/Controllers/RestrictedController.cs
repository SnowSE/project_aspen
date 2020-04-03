
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aspen.Api.Controllers
{
    [ApiController]
    public class RestrictedController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        [Route("restricted")]
        public string Get()
        {
            return "congratulations! YOU are authorized!";
        }
    }
}