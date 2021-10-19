using System.Text.Json;

namespace Api.Models.Entities
{
    public class PageData
    {
        public string Key { get; set; }
        public JsonDocument Data { get; set; }
    }
}
