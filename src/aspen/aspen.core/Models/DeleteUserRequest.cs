using System;
using System.Collections.Generic;
using System.Text;

namespace aspen.core.Models
{
    public class DeleteUserRequest
    {
        public string Username { get; set; }
        public Guid CharityId { get; set; }
    }
}
