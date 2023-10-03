using System.Text.Json;

namespace shared.DtoModels;

public record DtoPageData
{
    public string Key { get; set; }
    public JsonDocument Data { get; set; }
}