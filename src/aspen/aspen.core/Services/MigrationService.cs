using System;
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
        private readonly bool secure = false;

        private ConnectionString adminConnectionString { get; }

        public MigrationService(ConnectionString adminConnectionString)
        {
            this.adminConnectionString = adminConnectionString;
            //this.secure = adminConnectionString != SslMode.Disable;
        }

        public Task ApplyMigrations(ConnectionString connectionString)
        {
            var t = new Task(() =>
            {
                var connString = secure
                    ? connectionString.ToString()
                    : connectionString.ToInsecureString();

                var serviceProvider = new ServiceCollection()
                        .AddFluentMigratorCore()
                        .ConfigureRunner(rb => rb
                            .AddPostgres()
                            .WithGlobalConnectionString(connString)
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
            new NpgsqlConnection(secure
                ? connectionString.ToString()
                : connectionString.ToInsecureString());
        // public IDbConnection GetDbConnection(string connectionString) =>
        //     new NpgsqlConnection(connectionString);

        public IDbConnection GetAdminDbConnection() =>
            new NpgsqlConnection(secure
                ? adminConnectionString.ToString()
                : adminConnectionString.ToInsecureString());
    }
}