using System;
using Aspen.Core.Models;

namespace Aspen.Api.Http
{
    public class ThemeRequest
    {
        public Theme Theme { get; set; }
        public Guid CharityId { get; set; }
    }
}