
namespace Api.Controllers;

[ApiController]
[Authorize]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> log;

    public UserController(ILogger<UserController> logger)
    {
        log = logger;
    }

    [HttpGet]
    public string Get()
    {
        log.LogDebug("HttpGet User");
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
