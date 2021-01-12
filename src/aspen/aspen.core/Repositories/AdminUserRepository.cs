using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Aspen.Core.Services;
using Dapper;

namespace Aspen.Core.Repositories
{
    public class AdminUserRepository
    {
        private readonly IMigrationService migrationService;

        public AdminUserRepository(IMigrationService migrationService)
        {
            this.migrationService = migrationService;
        }

        public async Task<Result<bool>> Create(User user)
        {
            using(var dbConnection = migrationService.GetAdminDbConnection())
            {
                try
                {
                    await dbConnection.ExecuteAsync(
                        @"insert into AdminUser
                        values (@id, @firstname, @lastname, @username, @salt, @hashedpassword);",
                        user
                    );

                    return Result<bool>.Success(true);
                }
                catch(Npgsql.PostgresException)
                {
                    return Result<bool>.Failure("User already exists in database");
                }

            }
        }

        public async Task<Result<User>> Get(Guid id)
        {
            using(var dbConnection = migrationService.GetAdminDbConnection())
            {
                try
                {
                    var user = await dbConnection.QueryFirstAsync<User>(
                        @"
                        select * from AdminUser
                        where Id = @Id;",
                        new { Id = id }
                    );
                    return Result<User>.Success(user);
                }
                catch(System.InvalidOperationException)
                {
                    return Result<User>.Failure("User does not exist in database");
                }

            }
        }

        public async Task<Result<bool>> Update(User user)
        {
            using(var dbConnection = migrationService.GetAdminDbConnection())
            {
                var affectedRows = await dbConnection.ExecuteAsync(
                    @"update adminuser set
                        firstname = @firstname,
                        lastname = @lastname,
                        username = @username,
                        hashedpassword = @hashedpassword,
                        salt = @salt
                    where id = @id",
                    user
                );

                if(affectedRows == 1)
                    return Result<bool>.Success(true);
                else
                    return Result<bool>.Failure("User does not exist in database");
            }
        }

        public async Task<Result<bool>> Delete(User user)
        {
            using(var dbConnection = migrationService.GetAdminDbConnection())
            {
                var affectedRows = await dbConnection.ExecuteAsync(
                    @"delete from adminuser
                    where id = @id;",
                    user
                );

                if(affectedRows == 1)
                    return Result<bool>.Success(true);
                else
                    return Result<bool>.Failure("User does not exist in database");

            }
        }

        public async Task<Result<IEnumerable<User>>> GetAll()
        {
            using(var dbConnection = migrationService.GetAdminDbConnection())
            {
                var users = await dbConnection.QueryAsync<User>(
                    @"select * from adminuser;" 
                );

                return Result<IEnumerable<User>>.Success(users);
            }
        }
    }
}