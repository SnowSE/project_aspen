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
        return await pageDataRepository.GetAllAsync();
    }

    [HttpGet("keys")]
    public async Task<IEnumerable<string>> GetKeys()
    {
        return (await pageDataRepository.GetAllAsync()).Select(pd => pd.Key);
    }

    [HttpGet("{key}")]
    public async Task<ActionResult<DtoPageData>> GetByKey(string key)
    {
        var pageData = await pageDataRepository.GetAsync(key);
        if (pageData == null)
        {
            Log.Logger.Error("Page Data: Data key does not exist");
            return NotFound("Page Data key does not exist");
        }
        return pageData;
    }

    // PUT: api/PageData/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{key}")]
    /*[Authorize(Roles = "admin-aspen")]*/
    public async Task<IActionResult> Edit(string key, DtoPageData pageData)
    {
        if (!ModelState.IsValid)
        {
            Log.Logger.Error("Page Data: Model state is invalid");
            return BadRequest(getModelStateErrorMessage());
        }
        if (!await pageDataRepository.ExistsAsync(key))
        {
            Log.Logger.Error("Page Data: Data key does not exist");
            return NotFound("Page Data key does not exist");
        }
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
        if (!ModelState.IsValid || string.IsNullOrWhiteSpace(pageData.Key) || pageData.Data == null)
        {
            Log.Logger.Error("Page Data: Model state is invalid, page data is null, or has a white space");
            return BadRequest(getModelStateErrorMessage());
        }
        var createdPageData = await pageDataRepository.AddAsync(pageData);

        return CreatedAtAction(nameof(GetByKey), new { key = createdPageData.Key }, createdPageData);
    }

    // DELETE: api/PageData/5
    // DELETE: api/PageData?key={key}
    [HttpDelete("{key}")]
    /*[Authorize(Roles = "admin-aspen")]*/
    public async Task<IActionResult> Delete(string key)
    {
        if (!await pageDataRepository.ExistsAsync(key))
        {
            Log.Logger.Error("Page Data: Data key does not exist");
            return NotFound("Page Data key does not exist");
        }
        await pageDataRepository.DeleteAsync(key);
        return NoContent();
    }
}
