using System;
using System.Data;
using Aspen.Core.Data;
using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace Aspen.Integration.Helpers
{
    public static class MigrationHelper
    {

        private static string defaultConnectionString = "Server=localhost; Port=5433; Database=Aspen; User ID=Aspen; Password=Aspen;";
        private static string connectionString = Environment.GetEnvironmentVariable("INTEGRATION_TEST_CONNECTION")??defaultConnectionString;
        public static void Migrate()
        {
            var serviceProvider = new ServiceCollection()
                    .AddFluentMigratorCore()
                    .ConfigureRunner(rb => rb
                        .AddPostgres()
                        .WithGlobalConnectionString(connectionString)
                        .ScanIn(typeof(FirstMigration).Assembly).For.Migrations())
                    .AddLogging(lb => lb.AddFluentMigratorConsole())
                    .BuildServiceProvider(false);
            var runner = serviceProvider.GetRequiredService<IMigrationRunner>();
            runner.MigrateUp();
        }

        public static Func<IDbConnection> GetDbConnection = () => new NpgsqlConnection(connectionString);

    }
}