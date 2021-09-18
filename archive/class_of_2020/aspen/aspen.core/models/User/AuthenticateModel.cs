using System;
using System.ComponentModel.DataAnnotations;

namespace Aspen.Core.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
        [Required]
        public string Charity { get; set; }
        [Required]
        public Guid CharityID { get; set; }
    }
}