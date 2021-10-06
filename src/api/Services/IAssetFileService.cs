using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
namespace Api.Services
{
  public interface IAssetFileService
  {
    void storeAsset(IFormFile image);
  }
}
