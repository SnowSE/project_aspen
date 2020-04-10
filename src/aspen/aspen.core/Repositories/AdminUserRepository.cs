using Aspen.Core.Services;

namespace Aspen.Core.Repositories
{
    public class AdminUserRepository
    {
        private readonly IMigrationService migrationService;

        public AdminUserRepository(IMigrationService migrationService)
        {
            this.migrationService = migrationService;
        }
    }
}