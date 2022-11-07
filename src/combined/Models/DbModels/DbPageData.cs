using System.Text.Json;

namespace Api.DbModels;

[Index(nameof(Key), IsUnique = true)]
public record DbPageData
{
    public long ID { get; init; }
    public string Key { get; init; }
    public JsonDocument Data { get; init; }

}
