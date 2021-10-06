using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controller
{
  public interface IResponse<T>
  {
    string status { get; }
    T data { get; }
  }
  public class Response<T> : IResponse<T>
  {
    public Response(string status, T data)
    {
      this.status = status;
      this.data = data;
    }
    public string status { get; }
    public T data { get; }
  }


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
    public IResponse<string> Post([FromBody] IFormFile image)
    {
      assetsFileService.storeAsset(image);

      return new Response<string>("success", "success");
    }
  }
}