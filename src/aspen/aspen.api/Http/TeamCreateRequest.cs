using System;
using Aspen.Core.Models;

namespace Aspen.Api.Http
{
    public class TeamCreateRequest
    {
        public Guid CharityId { get; set; }
        public Team team { get; set; }
    }
}