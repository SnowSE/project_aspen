using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace Api.DbModels
{
    public record DbPageData
    {
        public long ID { get; init; }
        public string Key { get; init; }
        public JsonDocument Data { get; init; }

    }
    public static class DbPageDataHelper
    {
        public static DbPageData WithId(this DbPageData previousData, long newId)
        {
            return new DbPageData
            {
                ID = newId,
                Key = previousData.Key,
                Data = previousData.Data
            };
        }
    }
}