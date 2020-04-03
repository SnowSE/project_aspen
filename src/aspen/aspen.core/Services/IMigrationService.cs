using System.Data;
using System.Threading.Tasks;
using Aspen.Core.Models;

namespace Aspen.Core.Services
{
    public interface IMigrationService
    {
        Task ApplyMigrations(ConnectionString connectionString);
        IDbConnection GetDbConnection(ConnectionString connectionString);
        IDbConnection GetAdminDbConnection() ;
    }
}