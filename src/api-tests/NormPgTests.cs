using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Norm.Extensions;
using NormPgIdentity.Migrations;
using Npgsql;
using Xunit;

namespace api_tests
{
    public class Config
    {
        public string DefaultConnection { get; set; }
        public string TestDatabase { get; set; }
        public string MigrationsPath { get; set; }

        public static Config Value { get; }

        static Config()
        {
            Value = new Config();

            new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, false)
                .AddJsonFile("appsettings.test.json", true, false)
                .AddJsonFile("testsettings.json", true, false)
                .AddJsonFile("settings.json", true, false)
                .Build()
                .Bind(Value);
        }
    }

    public sealed class PostgreSqlFixture : IDisposable
    {
        public NpgsqlConnection Connection { get; }

        public PostgreSqlFixture()
        {
            Connection = new NpgsqlConnection(Config.Value.DefaultConnection);
            CreateTestDatabase(Connection);
            Connection.ChangeDatabase(Config.Value.TestDatabase);
            ApplyMigrations(Connection, MigrationDirection.Up);
        }

        public void Dispose()
        {
            ApplyMigrations(Connection, MigrationDirection.Down);
            Connection.Close();
            Connection.Dispose();
            using var connection = new NpgsqlConnection(Config.Value.DefaultConnection);
            DropTestDatabase(connection);
        }

        private static void CreateTestDatabase(NpgsqlConnection connection)
        {
            void DoCreate() => connection.Execute($"create database {Config.Value.TestDatabase}");
            try
            {
                DoCreate();
            }
            catch (PostgresException e) when (e.SqlState == "42P04")  // 42P04=duplicate_database, see https://www.postgresql.org/docs/9.3/errcodes-appendix.html
            {
                DropTestDatabase(connection);
                DoCreate();
            }
        }

        private static void DropTestDatabase(NpgsqlConnection connection) => connection.Execute($@"
            revoke connect on database {Config.Value.TestDatabase} from public;
            
            select 
                pid, pg_terminate_backend(pid) 
            from 
                pg_stat_activity 
            where 
                datname = '{Config.Value.TestDatabase}' and pid <> pg_backend_pid();
            drop database {Config.Value.TestDatabase};
            
            ");

        private static void ApplyMigrations(NpgsqlConnection connection, MigrationDirection direction)
        {
            foreach (var (_, name) in MigrationManager.EnumerateMigrations(direction, Config.Value.MigrationsPath))
            {
                connection.Execute(File.ReadAllText(name));
            }
        }
    }

    [CollectionDefinition("PostgreSqlDatabase")]
    public class DatabaseFixtureCollection : ICollectionFixture<PostgreSqlFixture> { }

    [Collection("PostgreSqlDatabase")]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1063:Implement IDisposable Correctly", Justification = "XUnit")]
    public abstract class PostgreSqlUnitTestFixture : IDisposable
    {
        protected NpgsqlConnection Connection { get; }

        protected PostgreSqlUnitTestFixture(PostgreSqlFixture fixture)
        {
            Connection = fixture.Connection.CloneWith(fixture.Connection.ConnectionString);
            Connection
                .Execute("begin")
                .Execute("set constraints all deferred");
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1063:Implement IDisposable Correctly", Justification = "XUnit")]
        public void Dispose()
        {
            Connection.Execute("rollback");
            Connection.Close();
            Connection.Dispose();
        }
    }
}