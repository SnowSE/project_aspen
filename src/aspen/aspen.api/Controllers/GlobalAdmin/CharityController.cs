using Microsoft.AspNetCore.Mvc;

namespace aspen.api.Controllers
{
    public class CharityController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "Welcome to the admin tenat page";
        }
    }
}