using System.Net;
namespace Api.Controllers;

[Route("api/links")]
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

    [HttpGet("{linkGUID}")]
    public async Task<DtoLink> Get(string linkGUID)
    {
        
        log.LogInformation($"Getting link {linkGUID}");
        var link = await linkRepository.LinkGUIDAsync(linkGUID);
        var results = mapper.Map<DtoLink>(link);
        return results;
    }



    [HttpPost]
    public async Task<ActionResult<DtoLink>> Add([FromBody] DtoLink dtoLink)
    {
        log.LogInformation($"Adding new dtoLink {dtoLink}");
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (dtoLink.ID != 0)
            return BadRequest("Cannot add with a valid id");

        var link = mapper.Map<Link>(dtoLink);
        var newLink = await linkRepository.Add(link);
        return mapper.Map<DtoLink>(newLink);

    }

}

