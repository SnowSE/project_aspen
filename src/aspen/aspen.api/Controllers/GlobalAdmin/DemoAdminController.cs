using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace aspen.web.Controllers.GlobalAdmin
{
    [Route("admin/[controller]")]
    [ApiController]
    public class DemoAdminController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "you made it to the global admin controller!";
        }
    }
}