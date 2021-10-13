using System.Threading.Tasks;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controller
{
    public record Response<T>(string status, T data);

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
        public async Task<Response<string>> PostAsync([FromBody] IFormFile image)
        {
            await assetsFileService.StoreAsset(image);

            return new Response<string>("success", "success");
        }
    }
}