using System.Net;
namespace v2.Controllers;

[Route("api/linkrecords")]
[ApiController]
public class LinkRecordController : ControllerBase
{
    private readonly ILinkRecordRepository linkRecordRepository;
    private readonly IMapper mapper;
    private readonly ILogger<LinkRecordController> log;

    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public LinkRecordController(ILinkRecordRepository linkRecordRepository, IMapper mapper, ILogger<LinkRecordController> log)
    {
        this.linkRecordRepository = linkRecordRepository;
        this.mapper = mapper;
        this.log = log;
    }

    [HttpPost]
    public async Task<ActionResult<DtoLinkRecord>> AddAsync([FromBody] DtoLinkRecord dtoLinkRecord)
    {
        log.LogInformation($"Adding new dtoLink {dtoLinkRecord}");
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());

        if (dtoLinkRecord.ID != 0)
            return BadRequest("Cannot add with a valid id");

        var newLinkRecord = await linkRecordRepository.Add(dtoLinkRecord);
        return mapper.Map<DtoLinkRecord>(newLinkRecord);

    }

}

