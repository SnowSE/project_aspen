using System;
using Aspen.Core.Models;
using FluentAssertions;
using NUnit.Framework;

namespace Aspen.Tests.ModelTests
{
    public class ConnectionStringTests
    {
        [Test]
        public void CanCreateValidConnectionString()
        {
            var validConnectionString = "Server=database; Port=5432; Database=Admin; User Id=Aspen; Password=Aspen;";
            Action act = () => new ConnectionString(validConnectionString);

            act.Should().NotThrow<Exception>();
        }

        [Test]
        public void InvalidPortThrowsArgumentError()
        {
            var invalidConnectionString = "Server=database; Port=70000; Database=Admin; User Id=Aspen; Password=Aspen;";
            Action act = () => new ConnectionString(invalidConnectionString);

            act.Should()
                .Throw<ArgumentException>()
                .WithMessage("Invalid port");
        }

        [Test]
        public void InvalidHostThrowsError()
        {
            var invalidConnectionString = "Server=database%$#$%#$%#$%#; Port=5432; Database=Admin; User Id=Aspen; Password=Aspen;";
            Action act = () => new ConnectionString(invalidConnectionString);

            act.Should()
                .Throw<ArgumentException>()
                .WithMessage("Invalid server");
        }

        [Test]
        public void InvalidDatabaseThrowsErrors()
        {
            var invalidConnectionString = "Server=database; Port=5432; Database=0Admin; User Id=Aspen; Password=Aspen;";
            Action act = () => new ConnectionString(invalidConnectionString);

            act.Should()
                .Throw<ArgumentException>()
                .WithMessage("Invalid database");
        }

        [Test]
        public void InvalidUserIdThrowsErrors()
        {
            var invalidConnectionString = "Server=database; Port=5432; Database=Admin; User Id=0Aspen; Password=Aspen;";
            Action act = () => new ConnectionString(invalidConnectionString);

            act.Should()
                .Throw<ArgumentException>()
                .WithMessage("Invalid user id");
        }

        [Test]
        public void InvalidPasswordThrowsErrors()
        {
            var invalidConnectionString = "Server=database; Port=5432; Database=Admin; User Id=Aspen; Password=Aspe n;";
            Action act = () => new ConnectionString(invalidConnectionString);

            act.Should()
                .Throw<ArgumentException>()
                .WithMessage("Invalid password");
        }

        [Test]
        public void CanGetCorrectConnectionStringBack()
        {
            var validConnectionString = "Server=database; Port=5432; Database=Admin; User Id=Aspen; Password=Aspen; ";
            var connectionString = new ConnectionString(validConnectionString);

            connectionString.ToString().Should().Be(validConnectionString);
        }
    }
}