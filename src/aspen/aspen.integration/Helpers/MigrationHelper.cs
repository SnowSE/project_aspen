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
        private static string defaultConnectionString = "Server=localhost; Port=5433; Database=Admin; User Id=Aspen; Password=Aspen;";
        private static string connectionString = Environment.GetEnvironmentVariable("INTEGRATION_TEST_CONNECTION")??defaultConnectionString;

        public static Func<IDbConnection> GetDbConnection = () => new NpgsqlConnection(connectionString);
    }
}