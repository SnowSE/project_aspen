namespace Api.Controllers;
using Microsoft.Extensions.Logging;
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
