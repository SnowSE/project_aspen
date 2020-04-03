using System.Data;
using System.Threading.Tasks;
using Aspen.Core.Data;
using Aspen.Core.Models;
using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace Aspen.Core.Services
{

    public class MigrationService : IMigrationService
    {
        private ConnectionString adminConnectionString { get; }

        public MigrationService(ConnectionString adminConnectionString)
        {
            this.adminConnectionString = adminConnectionString;
        }


        public Task ApplyMigrations(ConnectionString connectionString)
        {
            var t = new Task(() =>
            {
                var serviceProvider = new ServiceCollection()
                        .AddFluentMigratorCore()
                        .ConfigureRunner(rb => rb
                            .AddPostgres()
                            .WithGlobalConnectionString(connectionString.ToString())
                            .ScanIn(typeof(FirstMigration).Assembly).For.Migrations())
                        .AddLogging(lb => lb.AddFluentMigratorConsole())
                        .BuildServiceProvider(false);
                var runner = serviceProvider.GetRequiredService<IMigrationRunner>();
                runner.MigrateUp();
            });
            t.Start();
            return t;
        }

        public IDbConnection GetDbConnection(ConnectionString connectionString) =>
            new NpgsqlConnection(connectionString.ToString());

        public IDbConnection GetAdminDbConnection() =>
            new NpgsqlConnection(adminConnectionString.ToString());
    }
}