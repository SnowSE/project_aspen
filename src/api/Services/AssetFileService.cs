namespace Api.Services
{
  using Microsoft.AspNetCore.Http;
  using Microsoft.Extensions.Logging;

  public class AssetFileService : IAssetFileService
  {
    public ILogger<AssetFileService> logger { get; }

    public AssetFileService(ILogger<AssetFileService> logger)
    {
      this.logger = logger;
    }

    public void storeAsset(IFormFile image) 
    {

    }
  }
}