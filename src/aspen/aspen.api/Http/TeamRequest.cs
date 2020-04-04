using System;
using Aspen.Core.Models;

namespace Aspen.Api.Http
{
    public class TeamRequest
    {
        public Guid CharityId { get; set; }
        public Team team { get; set; }
    }
}