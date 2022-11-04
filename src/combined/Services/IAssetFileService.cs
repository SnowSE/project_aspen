namespace Api.Services;

public interface IAssetFileService
{
    Task<string> StoreAsset(IFormFile image);
}
