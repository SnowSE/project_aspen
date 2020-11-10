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
using FluentMigrator;
using Aspen.Core.Services;
using System.Threading.Tasks;
using Dapper;
using System.Data.Common;
using System.Data;

namespace Aspen.Api.Services
{
    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private IList<User> _users = new List<User>
        { 
            new User(Guid.NewGuid(), "Bob", "TheBuilder", "builder4lyfe", "asdf", new byte[]{}, "")
        };

        private readonly AppSettings _appSettings;
        private readonly IMigrationService _migrationService;

        public UserService(IOptions<AppSettings> appSettings, IMigrationService migrationService)
        {
            _appSettings = appSettings.Value;
            _migrationService = migrationService;
        }

        // https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/consumer-apis/password-hashing?view=aspnetcore-3.1
        public User Authenticate(string username, string password)
        {
            var user = _users.FirstOrDefault(x => x.Username == username);
            if (user == null)
                return null;

            string hash = hashPassword(user.Salt, password);

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

        public async Task<IEnumerable<User>> GetAll(Guid charityID)
        {
            var charityDbConnection = await getDbConnection(charityID);

            IEnumerable<User> users;

            using (charityDbConnection)
            {
                users = await charityDbConnection.QueryAsync<User>(
                    @"select * from charityuser;"
                );
            }

            return users;
        }

        public async Task CreateUser(CreateUserRequest userRequest, Guid charityID)
        {
            
            var charityDbConnection = await getDbConnection(charityID);


            var salt = generateSalt();
            string hash = hashPassword(salt, userRequest.Password);

            User user = new User(new Guid(),
                                 userRequest.FirstName,
                                 userRequest.LastName,
                                 userRequest.Username,
                                 hash,
                                 salt,
                                 null);

            using (charityDbConnection)
            {

                await charityDbConnection.ExecuteAsync(
                    @"insert into charityuser
                        values (@id, @firstname, @lastname, @username, @salt, @hashedpassword, @role);",
                    user
                );
            }

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

        public void UpdateUser(User user)
        {
            //Remove user with old information, replace with user with new information
            _users = _users.Where(u => u.Id != user.Id) as IList<User>;
            _users.Add(user);
        }


        public void UpdateUserPassword(Guid userID, string newPassword)
        {
            var user = _users.FirstOrDefault(x => x.Id == userID);
            if (user == null)
            {
                throw new KeyNotFoundException();
            }

            var salt = generateSalt();
            var hashedPassword = hashPassword(salt, newPassword);

            var newUser = user.UpdatePassword(salt, hashedPassword);

            _users = _users.Where(u => u.Id != user.Id) as IList<User>;
            _users.Add(newUser);
        }


        private string hashPassword(byte[] salt, string password)
        {
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                       password: password,
                       salt: salt,
                       prf: KeyDerivationPrf.HMACSHA1,
                       iterationCount: 10000,
                       numBytesRequested: 256 / 8));
        }

        //https://codereview.stackexchange.com/questions/93614/salt-generation-in-c
        private byte[] generateSalt()
        {
            int saltLengthLimitInBytes = 16;
            var salt = new byte[saltLengthLimitInBytes];

            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetNonZeroBytes(salt);
            }

            return salt;
        }

        
        private async Task<IDbConnection> getDbConnection(Guid charityID)
        {
            var adminDbConnection = _migrationService.GetAdminDbConnection();
            ConnectionString charityConnectionString;


            using (adminDbConnection)
            {
                charityConnectionString = await adminDbConnection.QueryFirstAsync<ConnectionString>(
                    @"select connectionstring from charity
                    where charityid = @charityID;"
                    , new { charityId = charityID });
            }


            return _migrationService.GetDbConnection(charityConnectionString);
        }

    }
}