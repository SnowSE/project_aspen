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

        public async Task Create(User user)
        {
            using(var dbConnection = migrationService.GetAdminDbConnection())
            {
                await dbConnection.ExecuteAsync(
                    @"insert into AdminUser
                    values (@id, @firstname, @lastname, @username, @salt, @hashedpassword);",
                    user
                );
            }
        }

        public async Task<User> Get(Guid id)
        {
            using(var dbConnection = migrationService.GetAdminDbConnection())
            {
                return await dbConnection.QueryFirstAsync<User>(
                    @"
                    select * from AdminUser
                    where Id = @Id;",
                    new {
                        Id = id
                    }
                );
            }
        }

        public async Task Update(User user)
        {
            using(var dbConnection = migrationService.GetAdminDbConnection())
            {
                await dbConnection.ExecuteAsync(
                    @"update adminuser set
                        firstname = @firstname,
                        lastname = @lastname,
                        username = @username,
                        hashedpassword = @hashedpassword,
                        salt = @salt
                    where id = @id",
                    user
                );
            }
        }

        public async Task Delete(User user)
        {
            using(var dbConnection = migrationService.GetAdminDbConnection())
            {
                await dbConnection.ExecuteAsync(
                    @"delete from adminuser
                    where id = @id;",
                    user
                );
            }
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            using(var dbConnection = migrationService.GetAdminDbConnection())
            {
                return await dbConnection.QueryAsync<User>(
                    @"select * from adminuser;" 
                );
            }
        }
    }
}