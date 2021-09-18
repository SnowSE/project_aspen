using Aspen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace aspen.core.Models
{
    public class UpdateUserRequest
    {
        public User User { get; set; }
        public Guid CharityId { get; set; }
    }
}
