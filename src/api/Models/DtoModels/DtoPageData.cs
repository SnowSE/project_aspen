using System.Text.Json;

namespace Api.DtoModels;

public record DtoPageData
{
    public string Key { get; init; }
    public JsonDocument Data { get; init; }
}
