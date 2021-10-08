using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
namespace Api.Services
{
  public interface IAssetFileService
  {
    Task storeAsset(IFormFile image);
  }
}
