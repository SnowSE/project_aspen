
namespace Api.Controllers;

[Route("api/link")]
[ApiController]
public class LinkController : ControllerBase
{
    private readonly ILinkRepository linkRepository;
    private readonly IMapper mapper;
    private readonly ILogger<LinkController> log;

    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public LinkController(ILinkRepository linkRepository, IMapper mapper, ILogger<LinkController> log)
    {
        this.linkRepository = linkRepository;
        this.mapper = mapper;
        this.log = log;
    }

    [HttpGet]
    public IEnumerable<string> Get()
    {
        return new string[] { "value1", "value2" };
    }


    [HttpPost]
    public async Task<ActionResult<DtoLink>> Add([FromBody] DtoLink dtoLink)
    {
        log.LogInformation($"Adding new dtoLink {dtoLink}", dtoLink);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (dtoLink.ID != 0)
            return BadRequest("Cannot add with a valid id");

        var link = mapper.Map<Link>(dtoLink);
        var newLink = await linkRepository.AddAsync(link);
        return mapper.Map<DtoLink>(newLink);

    }

}

