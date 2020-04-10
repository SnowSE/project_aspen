using System;
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
                    values (@id, @firstname, @lastname, @username, @salt, @passwordhash);",
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
    }
}