
namespace Api.Controllers;

[Route("api/[controller]")]
/*[Authorize]*/
[ApiController]
public class PageDataController : ControllerBase
{
    private readonly IPageDataRepository pageDataRepository;
    private readonly ILogger<PageDataController> log;

    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public PageDataController(IPageDataRepository pageDataRepository, ILogger<PageDataController> log)
    {
        this.pageDataRepository = pageDataRepository;
        this.log = log;
    }

    // GET: api/PageData
    [HttpGet]
    public async Task<IEnumerable<DtoPageData>> GetAll()
    {
        log.LogDebug("HttpGet GetAll DtoPageData");
        return await pageDataRepository.GetAllAsync();
    }

    [HttpGet("keys")]
    public async Task<IEnumerable<string>> GetKeys()
    {
        log.LogDebug("HttpGet GetKeys");
        return (await pageDataRepository.GetAllAsync()).Select(pd => pd.Key);
    }

    [HttpGet("{key}")]
    public async Task<ActionResult<DtoPageData>> GetByKey(string key)
    {
        log.LogInformation("Getting key {key}", key);
        var pageData = await pageDataRepository.GetAsync(key);
        if (pageData == null)
            return NotFound("Page Data key does not exist");
        return pageData;
    }

    // PUT: api/PageData/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{key}"), Authorize(Roles = AdminController.AspenAdminRole)]
    public async Task<IActionResult> Edit(string key, DtoPageData pageData)
    {
        log.LogInformation("Editing key {key} for page {pageData}", key, pageData);
        if (!ModelState.IsValid)
            return BadRequest(getModelStateErrorMessage());
        if (!await pageDataRepository.ExistsAsync(key))
            return NotFound("Page Data key does not exist");
        try
        {
            await pageDataRepository.EditAsync(key, pageData);
        }
        catch (DbUpdateConcurrencyException)
        {
            throw;
        }

        return NoContent();
    }

    [HttpPost, Authorize(Roles = AdminController.AspenAdminRole)]
    public async Task<ActionResult<DtoPageData>> Post(DtoPageData pageData)
    {
        log.LogDebug("HttpPost Post PageData");
        log.LogInformation("Posting PageData for {PageData}", pageData);
        if (!ModelState.IsValid || string.IsNullOrWhiteSpace(pageData.Key) || pageData.Data == null)
            return BadRequest(getModelStateErrorMessage());
        var createdPageData = await pageDataRepository.AddAsync(pageData);

        return CreatedAtAction(nameof(GetByKey), new { key = createdPageData.Key }, createdPageData);
    }

    // DELETE: api/PageData/5
    // DELETE: api/PageData?key={key}
    [HttpDelete("{key}"), Authorize(Roles = AdminController.AspenAdminRole)]
    public async Task<IActionResult> Delete(string key)
    {
        log.LogInformation("Deleting key {key}", key);
        if (!await pageDataRepository.ExistsAsync(key))
            return NotFound("Page Data key does not exist");
        await pageDataRepository.DeleteAsync(key);
        return NoContent();
    }
}
