using System;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace Aspen.Core.Models
{
    public class User
    {
        public User(Guid id, string firstname, string lastname, string username, string hashedpassword, string salt, string token)
        {
            this.Id = id;
            FirstName = firstname;
            LastName = lastname;
            Username = username;
            HashedPassword = hashedpassword;
            Salt = salt;
            Token = token;
        }

        private User(Guid id, string firstname, string lastname, string username, string salt, string hashedpassword)
        {
            this.Id = id;
            FirstName = firstname;
            LastName = lastname;
            Username = username;
            HashedPassword = hashedpassword;
            Salt = salt;
            Token = "";
        }

        public Guid Id { get; }
        public string FirstName { get; }
        public string LastName { get; }
        public string Username { get; }
        public string HashedPassword { get; }
        [JsonIgnore]
        public string Salt { get; }
        [JsonIgnore]
        public string Token { get; }

        public User UpdateFirstName(string firstname)
        {
            return new User(Id, firstname, LastName, Username, HashedPassword, Salt, Token);
        }
    }
}