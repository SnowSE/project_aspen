using System.Text.Json;

namespace Aspen.Api.DatabaseModels
{
    public class PageData
    {
        public string Key{get;set;}
        public JsonDocument Data{get;set;}
    }
}