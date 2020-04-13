using System;

namespace Aspen.Core.Models
{
    public class AspenImage
    {
        public Guid Id { get; }
        public string Name { get; }
        public string Type { get; }

        public static class ImageType
        {
            public static string Banner = "Banner";
        }

        public AspenImage(Guid id, string name, string type)
        {
            Id = id;
            Name = name;
            Type = type;
        }

    }
}