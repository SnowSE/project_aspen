using System;
using Aspen.Core.Models;
using FluentAssertions;
using NUnit.Framework;

namespace Aspen.Tests.ModelTests
{
    public class CharityTests
    {
        [Test]
        public void CannotCreateACharityWithNullDomains()
        {
            var connString = new ConnectionString("Server=notlocalhost; Port=5433; Database=changeme; Username=changeme; Password=changeme;");
            Action act = () => new Charity(Guid.NewGuid(), "charityname", "description", connString, null);

            act.Should().Throw<ArgumentException>().WithMessage("domains cannot be null");
        }
    }
}