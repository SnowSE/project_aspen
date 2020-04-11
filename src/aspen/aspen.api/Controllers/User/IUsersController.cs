using Aspen.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Aspen.Api.Controllers
{
    public interface IUsersController
    {
        IActionResult Authenticate([FromBody] AuthenticateModel model);
        IActionResult GetAll();
    }
}