using System;
using System.Collections.Generic;
using System.Text;

namespace aspen.core.Models
{
    public class CreateUserRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string CharityId { get; set; }
        public string Role { get; set; }
    }
}
