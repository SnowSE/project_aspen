using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Aspen.Core.Models;
using Aspen.Api.Helpers;
using aspen.core.Models;

namespace Aspen.Api.Services
{
    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<User> _users = new List<User>
        { 
            new User(Guid.NewGuid(), "Bob", "TheBuilder", "builder4lyfe", "asdf", new byte[]{}, "")
        };

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        // https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/consumer-apis/password-hashing?view=aspnetcore-3.1
        public User Authenticate(string username, string password)
        {
            var user = _users.FirstOrDefault(x => x.Username == username);
            if (user == null)
                return null;

            string hash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: user.Salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            if(password != user.HashedPassword)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                    // add role
                    // new Claim("AdminClaim", "true")
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                NotBefore = DateTime.UtcNow,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user = user.UpdateToken(tokenHandler.WriteToken(token));

            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _users;
        }

        public void CreateUser(CreateUserRequest userRequest)
        {
            //ToDo: Generate salt
            string hash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: userRequest.Password,
                salt: null,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            User user = new User(new Guid(), 
                                 userRequest.FirstName, 
                                 userRequest.LastName, 
                                 userRequest.Username, 
                                 hash, 
                                 null,
                                 null);


            //ToDo: Add to database instead of list
            _users.Add(user);
        }

        public void DeleteUser(User user)
        {
            if (!_users.Remove(user))
            {
                throw new InvalidOperationException("Cannot delete user that does not exist");
            }
        }
    }
}