using System;
using Aspen.Core.Models;

namespace Aspen.CharityApi.Http
{
    public class ThemeRequest
    {
        public Theme Theme { get; set; }
        public Guid CharityId { get; set; }
    }
}