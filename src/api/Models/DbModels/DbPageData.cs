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
}