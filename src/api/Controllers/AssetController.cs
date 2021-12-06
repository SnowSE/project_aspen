namespace Api.Controllers;

public record Response<T> { public T Data { get; init; } }

[ApiController]
[Authorize]
[Route("/api/[controller]")]
public class AssetController : ControllerBase
{
    public IAssetFileService assetsFileService { get; }

    public AssetController(IAssetFileService assetsFileService)
    {
        this.assetsFileService = assetsFileService;
    }

    [SwaggerOperation(Summary = "Endpoint for users to upload file assets.", Description = "Recieves one file in FormData that has the key 'asset'. Returned data value can be accessed at that can be accessed at /assets/{data}")]
    [HttpPost]
    public async Task<ActionResult<Response<string>>> PostAsync([FromForm] IFormFile asset)
    {
        var newId = await assetsFileService.StoreAsset(asset);

        return Ok(new Response<string> { Data = newId });
    }
}
