using System.Text.Json;

namespace Aspen.Api.DtoModels
{
    public class DtoPageData
    {
        public string Key{get;set;}
        public JsonDocument Data{get;set;}
    }
}