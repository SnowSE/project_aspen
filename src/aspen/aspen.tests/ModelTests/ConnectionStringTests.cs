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
            var validConnectionString = "Server=database; Port=70000; Database=Admin; User Id=Aspen; Password=Aspen;";
            Action act = () => new ConnectionString(validConnectionString);

            act.Should()
                .Throw<ArgumentException>()
                .WithMessage("Invalid port");
        }

        [Test]
        public void InvalidHostThrowsError()
        {
            var validConnectionString = "Server=database%$#$%#$%#$%#; Port=5432; Database=Admin; User Id=Aspen; Password=Aspen;";
            Action act = () => new ConnectionString(validConnectionString);

            act.Should()
                .Throw<ArgumentException>()
                .WithMessage("Invalid server");
        }
    }
}