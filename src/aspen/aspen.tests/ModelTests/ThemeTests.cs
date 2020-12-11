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
            Action act = () => new Theme(color, color, color, color, "Times new roman", "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg", "http://www.unitedangels.org/wp-content/themes/parallelus-razor/assets/images/header-logo.png");

            act.Should().Throw<ArgumentException>().WithMessage("illegal color");
        }

        [Test]
        public void FontFamilyCannotBeMoreThan30Characters()
        {
            var color = "#000000";
            Action act = () => new Theme(color, color, color, color, "Times new romanaasdkflasdjfkasjdflaksdjflsadkweoirqoewiuroqwieurqoieuroqweurqoweurfsajdflsakdjfalsdkfjsdflkasdj", "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg", "http://www.unitedangels.org/wp-content/themes/parallelus-razor/assets/images/header-logo.png");

            act.Should().Throw<ArgumentException>().WithMessage("font family too long");
        }
    }
}