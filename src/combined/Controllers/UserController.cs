using System.Text;
namespace Api.Controllers;

[ApiController]
[Authorize]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> log;
    private readonly IPersonRepository personRepository;
    private readonly IMapper mapper;

    public UserController(ILogger<UserController> logger, IPersonRepository personRepository, IMapper mapper)
    {
        log = logger;
        this.personRepository = personRepository;
        this.mapper = mapper;
    }

    [HttpGet]
    [SwaggerOperation(
        Summary = "Get the DtoPerson for the logged on user",
        Description = @"Gets the DtoPerson for the currently logged in user.</br>
If the current user doesn't have a Person record then one will be created for them.")]
    public async Task<DtoPerson> GetAsync()
    {
        var emailAddress = User.Claims.Single(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value;
        try
        {
            var person = await personRepository.GetByAuthIdAsync(emailAddress);
            return mapper.Map<DtoPerson>(person);
        }
        catch (NotFoundException<Person>)
        {
            var name = User.Claims.Single(c => c.Type == "name").Value;
            var person = await personRepository.AddAsync(name, null, emailAddress);
            return mapper.Map<DtoPerson>(person);
        }
    }

    [HttpGet("claims")]
    public string GetClaims()
    {
        StringBuilder claims = new();
        log.LogDebug("HttpGet User");
        foreach (var claim in User.Claims)
        {
            Console.WriteLine(claim.Type + " - " + claim.Value + " - " + claim.ToString());
            claims.AppendLine(claim.Type + " - " + claim.Value + " - " + claim.ToString());
        }
        Console.WriteLine("");
        Console.WriteLine("");
        Console.WriteLine("");
        Console.WriteLine("");
        // User.Claims
        return claims.ToString();
    }

    [HttpGet("donations")]
    public IEnumerable<DtoDonation> Donations()
    {
        throw new NotImplementedException();
    }

}
