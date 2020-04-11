using System;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace Aspen.Core.Models
{
    public class User
    {
        public User(Guid id, string firstname, string lastname, string username, string hashedpassword, byte[] salt, string token)
        {
            this.Id = id;
            FirstName = firstname;
            LastName = lastname;
            Username = username;
            HashedPassword = hashedpassword;
            Salt = salt;
            Token = token;
        }

        private User(Guid id, string firstname, string lastname, string username, byte[] salt, string hashedpassword)
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
        public byte[] Salt { get; }
        [JsonIgnore]
        public string Token { get; }

        public User UpdateFirstName(string newFirstName)
        {
            return new User(Id, newFirstName, LastName, Username, HashedPassword, Salt, Token);
        }

        public User UpdateToken(string newToken)
        {
            return new User(Id, FirstName, LastName, Username, HashedPassword, Salt, newToken);
        }
    }
}