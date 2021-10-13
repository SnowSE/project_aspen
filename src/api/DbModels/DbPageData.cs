using System.Text.Json;

namespace Aspen.Api.DbModels
{
    public class DbPageData
    {
        public string Key{get;set;}
        public JsonDocument Data{get;set;}
    }
}