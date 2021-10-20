using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace Api.DbModels
{
    public class DbPageData
    {
        public long ID { get; set; }
        public string Key{get;set;}
        public JsonDocument Data{get;set;}
    }
}