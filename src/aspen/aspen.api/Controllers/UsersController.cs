using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Aspen.Core.Services;
using Aspen.Core.Models;
using Aspen.Api.Services;
using System.Threading.Tasks;
using Aspen.Core;
using Microsoft.Extensions.Logging;
using aspen.core.Models;
using System;

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

        [HttpPost("[action]")]
        public async Task<ApiResult> Authenticate([FromBody]AuthenticateModel model)
        {
            Guid CharityId = Guid.Parse(model.CharityId);
            _log.LogError($"model: {model}, username={model.Username}, password={model.Password}");

            var user = await _userService.Authenticate(model.Username, model.Password, CharityId);

            _log.LogError($"User: {user?.ToString() ?? "[user object is null]"}");

            if (user == null)
                return ApiResult.Failed("");

            return ApiResult.Success(user.Token);
        }

        [HttpGet("[action]")]
        public  async Task<IActionResult> GetAll(Guid charityID)
        {
            var users = await _userService.GetAll(charityID);
            return Ok(users);
        }

        [HttpPost("[action]")]
        public IActionResult CreateUser([FromBody] CreateUserRequest createUserRequest)
        {
            try
            {
                _userService.CreateUser(createUserRequest);
            } 
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok();

        }

        [HttpPost("[action]")]
        public IActionResult DeleteUser(DeleteUserRequest deleteUserRequest)
        {
            try
            {
                _userService.DeleteUser(deleteUserRequest);
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult UpdateUser(UpdateUserRequest updateUserRequest)
        {
            _userService.UpdateUser(updateUserRequest);

            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult UpdateUserPassword(UpdateUserRequest updateUserRequest)
        {
            try 
            {
                _userService.UpdateUserPassword(updateUserRequest);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
            
        }
    }
}