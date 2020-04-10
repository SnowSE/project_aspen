using System;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace Aspen.Core.Models
{
    public class User
    {
        public User(Guid id, string firstname, string lastname, string username, string passwordhash, string salt, string token)
        {
            this.Id = id;
            FirstName = firstname;
            LastName = lastname;
            Username = username;
            PasswordHash = passwordhash;
            Salt = salt;
            Token = token;
        }

        private User(Guid id, string firstname, string lastname, string username, string salt, string hashedpassword)
        {
            this.Id = id;
            FirstName = firstname;
            LastName = lastname;
            Username = username;
            PasswordHash = hashedpassword;
            Salt = salt;
            Token = "";
        }

        public Guid Id { get; }
        public string FirstName { get; }
        public string LastName { get; }
        public string Username { get; }
        public string PasswordHash { get; }
        [JsonIgnore]
        public string Salt { get; }
        [JsonIgnore]
        public string Token { get; }
    }
}