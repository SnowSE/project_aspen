using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Aspen.Core.Services;
using Aspen.Core.Models;
using Aspen.Api.Services;
using System.Threading.Tasks;
using Aspen.Core;
using System;
using Aspen.Api.Http;

namespace Aspen.Api.Controllers
{
    [ApiController]
    [Route("admin/user/{action}")]
    public class ClaimsController : ControllerBase
    {
        private IClaimsService _claimsService;

        public ClaimsController(IClaimsService claimsService)
        {
            _claimsService = claimsService;
        }

        [HttpPost]
        public async Task<ApiResult> Authenticate([FromBody]AuthenticateModel model)
        {
            var user = _claimsService.Authenticate(model.Username, model.Password);

            if (user == null)
                ApiResult.Failed("");

            return ApiResult.Success(user);
        }

        [HttpGet]
        [Authorize(Policy = "Admin")]
        public IActionResult GetAll()
        {
            var claims = _claimsService.GetAll();
            return Ok(claims);
        }

        [HttpPost]
        public async Task<ApiResult> Create([FromBody] ClaimsRequest request)
        {
            throw new NotImplementedException();
        }
        
        [HttpPost]
        public async Task<ApiResult> Update([FromBody] ClaimsRequest request) 
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<ApiResult> Delete([FromBody] ClaimsRequest request)
        {
            throw new NotImplementedException();
        }
    }
}