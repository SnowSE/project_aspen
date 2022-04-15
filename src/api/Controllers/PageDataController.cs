using Serilog;

namespace Api.Controllers;

[Route("api/[controller]")]
/*[Authorize]*/
[ApiController]
public class PageDataController : ControllerBase
{
    private readonly IPageDataRepository pageDataRepository;
    private string getModelStateErrorMessage() =>
        string.Join(" | ",
            ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
            );

    public PageDataController(IPageDataRepository pageDataRepository)
    {
        this.pageDataRepository = pageDataRepository;
    }

    // GET: api/PageData
    [HttpGet]
    public async Task<IEnumerable<DtoPageData>> GetAll()
    {
        Log.Debug("HttpGet GetAll DtoPageData");
        return await pageDataRepository.GetAllAsync();
    }

    [HttpGet("keys")]
    public async Task<IEnumerable<string>> GetKeys()
    {
        Log.Debug("HttpGet GetKeys");
        return (await pageDataRepository.GetAllAsync()).Select(pd => pd.Key);
    }

    [HttpGet("{key}")]
    public async Task<ActionResult<DtoPageData>> GetByKey(string key)
    {
        Log.Debug("HttpGet GetByKey");
        Log.Information("Getting key {key}", key);
        var pageData = await pageDataRepository.GetAsync(key);
        if (pageData == null)
            return NotFound("Page Data key does not exist");
        return pageData;
    }

    // PUT: api/PageData/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{key}")]
    /*[Authorize(Roles = "admin-aspen")]*/
    public async Task<IActionResult> Edit(string key, DtoPageData pageData)
    {
        Log.Debug("HttpPut Edit Key");
        Log.Information("Editing key {key} for page {pageData}", key, pageData);
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

    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    /*[Authorize(Roles = "admin-aspen")]*/
    public async Task<ActionResult<DtoPageData>> Post(DtoPageData pageData)
    {
        Log.Debug("HttpPost Post PageData");
        Log.Information("Posting PageData for {PageData}", pageData);
        if (!ModelState.IsValid || string.IsNullOrWhiteSpace(pageData.Key) || pageData.Data == null)
            return BadRequest(getModelStateErrorMessage());
        var createdPageData = await pageDataRepository.AddAsync(pageData);

        return CreatedAtAction(nameof(GetByKey), new { key = createdPageData.Key }, createdPageData);
    }

    // DELETE: api/PageData/5
    // DELETE: api/PageData?key={key}
    [HttpDelete("{key}")]
    /*[Authorize(Roles = "admin-aspen")]*/
    public async Task<IActionResult> Delete(string key)
    {
        Log.Debug("HttpDelete Deleteting Key");
        Log.Information("Deleteting key {key}", key);
        if (!await pageDataRepository.ExistsAsync(key))
            return NotFound("Page Data key does not exist");
        await pageDataRepository.DeleteAsync(key);
        return NoContent();
    }
}
