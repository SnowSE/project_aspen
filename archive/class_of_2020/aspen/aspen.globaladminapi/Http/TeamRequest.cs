using System;
using Aspen.Core.Models;

namespace Aspen.GlobalAdminApi.Http
{
    public class TeamRequest
    {
        public Guid CharityId { get; set; }
        public Team team { get; set; }
    }
}