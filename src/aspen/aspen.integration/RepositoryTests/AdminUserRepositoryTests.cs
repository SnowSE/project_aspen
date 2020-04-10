using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Aspen.Core.Services;
using Aspen.Integration.Helpers;

namespace Aspen.Integration.RepositoryTests
{
    public class AdminUserRepositoryTests
    {
        private MigrationService migrationService;
        private AdminUserRepository adminUserRepo;

        public AdminUserRepositoryTests()
        {
            var connString = new ConnectionString(MigrationHelper.ConnectionString);
            migrationService = new MigrationService(connString, secure: false);
            var t = migrationService.ApplyMigrations(connString);
            t.Wait();

            adminUserRepo = new AdminUserRepository(migrationService);
        }

    }
}