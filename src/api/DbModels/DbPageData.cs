using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace Aspen.Api.DbModels
{
    public class DbPageData
    {
        [Key]
        public string Key{get;set;}
        public JsonDocument Data{get;set;}
    }
}