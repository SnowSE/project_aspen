using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace dotnet.Controllers
{
  [ApiController]
  [Authorize]
  [Route("/api/user")]
  public class UserController : ControllerBase
  {

    private readonly ILogger<WeatherForecastController> _logger;

    public UserController(ILogger<WeatherForecastController> logger)
    {
      _logger = logger;
    }

    [HttpGet]
    public String Get()
    {
      // return JsonSerializer.Serialize(User);
      return "here";
    }
  }
}
