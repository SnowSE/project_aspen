using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace Aspen.Api.DbModels
{
    public class DbPageData
    {
        public int Id { get; set; }
        public string Key{get;set;}
        public JsonDocument Data{get;set;}
    }
}