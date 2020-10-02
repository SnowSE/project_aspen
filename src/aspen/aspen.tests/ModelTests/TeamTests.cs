using System;
using Aspen.Core.Models;
using FluentAssertions;
using NUnit.Framework;

namespace Aspen.Tests.ModelTests
{
    public class TeamTests
    {
        [Test]
        public void CanCreateValidTeam()
        {
            Action act = () => new Team(Guid.NewGuid(), "Diego's Fans", "We want to support Diego!!");

            act.Should().NotThrow<Exception>();
        }

        [Test]
        public void CannotCreateTeamWithLargeName()
        {
            var excessiveName = "Diego's Fans!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
            Action act = () => new Team(Guid.NewGuid(), excessiveName, "We want to support Diego!!");

            act.Should()
                .Throw<ArgumentException>()
                .WithMessage("Team name is greater than 60 characters");
        }
    }
}