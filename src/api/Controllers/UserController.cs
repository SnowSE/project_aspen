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
  public class UserController : ControllerBase
  {

    private readonly ILogger<UserController> logger;

    public UserController(ILogger<UserController> logger)
    {
      this.logger = logger;
    }

    [HttpGet]
    public string Get()
    {

      foreach (var claim in User.Claims)
      {
        Console.WriteLine(claim.Type + " - " + claim.Value + " - " + claim.ToString());
      }
      Console.WriteLine("");
      Console.WriteLine("");
      Console.WriteLine("");
      Console.WriteLine("");
      // User.Claims
      return "here";
    }
  }
}
