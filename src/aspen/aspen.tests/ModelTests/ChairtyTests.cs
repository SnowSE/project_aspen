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
            Action act = () => new Charity(Guid.NewGuid(), "charityname", "description", null);

            act.Should().Throw<ArgumentException>().WithMessage("domains cannot be null");
        }
    }
}