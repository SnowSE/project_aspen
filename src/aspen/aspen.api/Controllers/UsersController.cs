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

        [HttpGet]
        public async Task<ApiResult> GetByUserId([FromQuery(Name = "UserId")] Guid userId) =>
            await userId
                .ValidateFunction(getValidUser)
                .ReturnApiResult();

        [HttpPost]
        public async Task<ApiResult> Create([FromBody] UserRequest request) =>
            await request
                .ValidateFunction(getValidUser)
                .ReturnApiResult();
        
        [HttpPost]
        public async Task<ApiResult> Update([FromBody] UserRequest request) =>
            await request
                .ValidateFunction(getValidUser)              
                .ReturnApiResult();

        [HttpPost]
        public async Task<ApiResult> Delete([FromBody] UserRequest request) =>
            await request
                .ValidateFunction(getValidUser)
                .ReturnApiResult();

        private async Task<Result<User>> getValidUser(UserRequest request)
        {
            return await _userService.getValidUser(request.User.userId);
        }

        private async Task<Result<User>> getValidUser(Guid userId)
        {
            return await _userService.GetByUserId(userId);
        }
    }
}