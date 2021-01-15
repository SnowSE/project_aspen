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
using Aspen.CharityApi.Helpers;
using aspen.core.Models;
using FluentMigrator;
using Aspen.Core.Services;
using System.Threading.Tasks;
using Dapper;
using System.Data.Common;
using System.Data;


namespace Aspen.CharityApi.Services
{
    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private IList<User> _users = new List<User>
        { 
            new User(Guid.NewGuid(), "Bob", "TheBuilder", "admin", "password", "User", new byte[]{}, "")
        };

        private readonly AppSettings _appSettings;
        private readonly IMigrationService _migrationService;

        public UserService(IOptions<AppSettings> appSettings, IMigrationService migrationService)
        {
            _appSettings = appSettings.Value;
            _migrationService = migrationService;
        }

        // https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/consumer-apis/password-hashing?view=aspnetcore-3.1
        public async Task<User> Authenticate(string username, string password, Guid charityId)
        {
            var charityDbConnection = await getDbConnection(charityId);
            User user;

            using (charityDbConnection)
            {
                user = await charityDbConnection.QueryFirstAsync<User>(
                    @"select * from charityuser 
                    where username = @Username;"
                    , new { Username = username }
                );
            }

            if (user == null)
                return null;

            string hash = hashPassword(user.Salt, password);

            if(hash != user.HashedPassword)
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

            return _users;
        }

        public async Task CreateUser(CreateUserRequest userRequest)
        {

            var charityDbConnection = await getDbConnection(userRequest.CharityId);


            var salt = generateSalt();
            string hash = hashPassword(salt, userRequest.Password);

            User user = new User(Guid.NewGuid(),
                                 userRequest.FirstName,
                                 userRequest.LastName,
                                 userRequest.Username,
                                 hash,
                                 "User",
                                 salt,
                                 null);

            try
            {
                using (charityDbConnection)
                {

                    await charityDbConnection.ExecuteAsync(
                        @"insert into CharityUser
                        values (@id, @firstname, @lastname, @username, @salt, @hashedpassword, @role);",
                        user
                    );
                }

            }
            catch (Npgsql.PostgresException e)
            {
                throw new Exception("Error creating user: " + e.MessageText);
            }

            //ToDo: Add to database instead of list
            _users.Add(user);

        }

        public async Task DeleteUser(DeleteUserRequest deleteUserRequest)
        {
            var charityDbConnection = await getDbConnection(deleteUserRequest.CharityId);
            

            try
            {
                using (charityDbConnection)
                {

                    await charityDbConnection.ExecuteAsync(
                        @"delete from CharityUser
                        where username = @username;",
                        new {username = deleteUserRequest.Username}
                    );
                }
            }
            catch (Npgsql.PostgresException e)
            {
                throw new InvalidOperationException("Cannot delete user:" + e.MessageText);
            }
        }

        public async Task UpdateUser(UpdateUserRequest updateUserRequest)
        {

            var charityDbConnection = await getDbConnection(updateUserRequest.CharityId);

            try
            {
                using (charityDbConnection)
                {

                    await charityDbConnection.ExecuteAsync(
                         @"update CharityUser set
                        firstname = @firstname,
                        lastname = @lastname,
                        username = @username,
                        role = @role
                        where id = @id",
                        updateUserRequest.User
                    );
                }

            }
            catch (Npgsql.PostgresException e)
            {
                throw new Exception("Error creating user: " + e.MessageText);
            }

        }


        public async Task UpdateUserPassword(UpdateUserRequest updateUserRequest)
        {

            var charityDbConnection = await getDbConnection(updateUserRequest.CharityId);

            var salt = generateSalt();
            var hashedPassword = hashPassword(salt, updateUserRequest.User.HashedPassword);

            var newUser = updateUserRequest.User.UpdatePassword(salt, hashedPassword);

            try
            {
                using (charityDbConnection)
                {

                    await charityDbConnection.ExecuteAsync(
                         @"update CharityUser set
                        hashedPassword = @hashedPassword,
                        salt = @salt
                        where id = @id",
                        newUser
                    );
                }

            }
            catch (Npgsql.PostgresException e)
            {
                throw new Exception("Error creating user: " + e.MessageText);
            }

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
            Charity charity;

            using (adminDbConnection)
            {
                charity = await adminDbConnection.QueryFirstAsync<Charity>(
                    @"select * from charity
                    where charityid = @charityId;"
                    , new { charityId = charityID });
            }

            charityConnectionString = charity.ConnectionString;

            return _migrationService.GetDbConnection(charityConnectionString);
        }

      
    }
}