namespace v2.Services;

public interface IAssetFileService
{
    Task<string> StoreAsset(IFormFile image);
}
