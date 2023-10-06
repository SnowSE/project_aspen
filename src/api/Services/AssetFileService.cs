namespace Api.Services;

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

    public async Task<string> StoreAsset(IFormFile asset)
    {
        Console.WriteLine(asset.FileName);
        var extension = Path.GetExtension(asset.FileName);
        var newFileName = Guid.NewGuid().ToString() + extension;
        var filePath = Path.Combine(assetsDirectory, newFileName);
        using (Stream fileStream = new FileStream(filePath, FileMode.Create))
        {
            await asset.CopyToAsync(fileStream);
        }
        return newFileName;
    }
}
