using System;
using Aspen.Core.Models;

namespace Aspen.CharityApi.Http
{
    public class TeamRequest
    {
        public Guid CharityId { get; set; }
        public Team team { get; set; }
    }
}