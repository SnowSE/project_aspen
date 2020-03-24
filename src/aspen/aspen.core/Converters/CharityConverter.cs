using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Aspen.Core.Models;

namespace Aspen.Core.Converters
{
    public class CharityConverter : JsonConverter<Charity>
    {
        public override bool CanConvert(Type typeToConvert)
        {
            return base.CanConvert(typeToConvert);
        }

        public override bool Equals(object obj)
        {
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public override Charity Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }

        public override string ToString()
        {
            return base.ToString();
        }

        public override void Write(Utf8JsonWriter writer, Charity value, JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }
    }
}