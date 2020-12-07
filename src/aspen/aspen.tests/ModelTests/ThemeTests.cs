using System;
using Aspen.Core.Models;
using FluentAssertions;
using NUnit.Framework;

namespace Aspen.Tests.ModelTests
{
    public class ThemeTests
    {
        [Test]
        public void InvalidColorsThrowException()
        {
            var color = "notahexcolor";
            Action act = () => new Theme(color, color, color, color, "Times new roman", "http://localhost.com", "http://localhost.com");

            act.Should().Throw<ArgumentException>().WithMessage("illegal color");
        }

        [Test]
        public void FontFamilyCannotBeMoreThan30Characters()
        {
            var color = "#000000";
            Action act = () => new Theme(color, color, color, color, "Times new romanaasdkflasdjfkasjdflaksdjflsadkweoirqoewiuroqwieurqoieuroqweurqoweurfsajdflsakdjfalsdkfjsdflkasdj", "http://localhost.com", "http://localhost.com");

            act.Should().Throw<ArgumentException>().WithMessage("font family too long");
        }
    }
}