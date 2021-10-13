using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Api.Services
{

  public class AssetFileService : IAssetFileService
  {
    public ILogger<AssetFileService> logger { get; }
    public string assetsDirectory { get; }
    public IConfiguration config { get; }

    public AssetFileService(ILogger<AssetFileService> logger, IConfiguration config)
    {
      this.logger = logger;
      this.config = config;
      assetsDirectory = config.GetSection("AssetsDirectory").Value;
      if (assetsDirectory.Length == 0)
      {
        throw new Exception("AssetsDirectory configuration is empty");
      }
    }

    public async Task StoreAsset(IFormFile image)
    {
      string filePath = Path.Combine(assetsDirectory, image.FileName);
      using (Stream fileStream = new FileStream(filePath, FileMode.Create))
      {
        await image.CopyToAsync(fileStream);
      }
    }
  }
}