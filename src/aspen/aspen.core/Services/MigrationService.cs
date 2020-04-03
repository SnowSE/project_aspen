using Aspen.Core.Data;
using Aspen.Core.Models;
using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;

namespace Aspen.Core.Services
{
    public class MigrationService
    {
        public static void ApplyMigrations(ConnectionString connectionString)
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
        }
    }
}