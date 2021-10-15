using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
namespace Api.Services
{
    public interface IAssetFileService
    {
        Task<string> StoreAsset(IFormFile image);
    }
}
