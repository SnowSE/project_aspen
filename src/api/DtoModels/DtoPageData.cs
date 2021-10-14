using System.Text.Json;

namespace Api.DtoModels
{
    public class DtoPageData
    {
        public string Key{get;set;}
        public JsonDocument Data{get;set;}
    }
}