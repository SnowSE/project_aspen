using System;
using System.Data;
using Npgsql;
using NUnit.Framework;

namespace aspen.integration.RepositoryTests
{
    public class CharityRepositoryTests
    {
        private Func<IDbConnection> getDbConnection { get; set; }

        public CharityRepositoryTests()
        {
            getDbConnection = () => new NpgsqlConnection("Server=localhost; Port=5433; Database=Aspen; User ID=Aspen; Password=Aspen;");
        }
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void CanAddCharityToDatabase()
        {
            Assert.Pass();
        }
    }
}