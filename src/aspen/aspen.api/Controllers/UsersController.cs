using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Aspen.Core.Services;
using Aspen.Core.Models;
using Aspen.Api.Services;
using System.Threading.Tasks;
using Aspen.Core;
using Microsoft.Extensions.Logging;

namespace Aspen.Api.Controllers
{
    [ApiController]
    [Route("admin/user/")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private readonly ILogger<UserController> _log;

        public UserController(IUserService userService, ILogger<UserController> log)
        {
            _userService = userService;
            _log = log;
        }

        [HttpPost("authenticate")]
        public async Task<ApiResult> Authenticate([FromBody]AuthenticateModel model)
        {
            _log.LogError($"model: {model}, username={model.Username}, password={model.Password}");

            var user = _userService.Authenticate(model.Username, model.Password);

            _log.LogError($"User: {user?.ToString() ?? "[user object is null]"}");

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