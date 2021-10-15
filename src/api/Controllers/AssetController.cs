using System.Threading.Tasks;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controller
{
    public record Response<T>(T data);

    [ApiController]
    [Authorize]
    [Route("/api/[controller]")]
    public class AssetController : ControllerBase
    {
        public ILogger<AssetController> logger { get; }
        public IAssetFileService assetsFileService { get; }

        public AssetController(ILogger<AssetController> logger, IAssetFileService assetsFileService)
        {
            this.logger = logger;
            this.assetsFileService = assetsFileService;
        }

        [HttpPost]
        public async Task<ActionResult<Response<string>>> PostAsync([FromBody] IFormFile image)
        {
            var newId = await assetsFileService.StoreAsset(image);

            return Ok(new Response<string>(newId));
        }
    }
}