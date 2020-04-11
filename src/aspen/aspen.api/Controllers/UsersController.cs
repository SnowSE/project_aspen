using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Aspen.Core.Services;
using Aspen.Core.Models;
using Aspen.Api.Services;
using System.Threading.Tasks;
using Aspen.Core;

namespace Aspen.Api.Controllers
{
    [ApiController]
    [Route("admin/user/{action}")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ApiResult> Authenticate([FromBody]AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                ApiResult.Failed("");

            return ApiResult.Success(user.Token);
        }

        [HttpGet]
        [Authorize(Policy = "Admin")]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}