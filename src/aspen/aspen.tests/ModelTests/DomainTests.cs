using System;
using Aspen.Core.Models;
using FluentAssertions;
using NUnit.Framework;

namespace Aspen.Tests.ModelTests
{
    public class ModelTests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void CannotCreateInvalidDomain()
        {
            var invalidDomain = "something*escapes";

            Action act = () => new Domain(invalidDomain);

            act.Should().Throw<ArgumentException>().WithMessage("illegal charaters in domain");
        }

        [Test]
        public void CannotCreateInvalidDomainPart2()
        {
            var invalidDomain = "something_escapes";

            Action act = () => new Domain(invalidDomain);

            act.Should().Throw<ArgumentException>().WithMessage("illegal charaters in domain");
        }

        [Test]
        public void DomainsCannotBeTooLong()
        {
            var longDomain = "saldjfqwpeoiruqpwoeiruqpweoiruqwpeoiruqwepoiruqwepoiruqweporiuewqpriuqwpeoriuqwpeoiruqwpoeriuqwpeoriuwqpoiruwqpeoriuwqeporiquewrpoqiwuerpowqieurpoewqiurqpweoiruqwpeoriuwqeporiuewqporuwqporeiuqewr";


            Action act = () => new Domain(longDomain);

            act.Should().Throw<ArgumentException>().WithMessage("domain longer than 60 characters");
        }

        [Test]
        public void DomainsCanHaveNumbers()
        {
            var domainWithNumbers = "some5numbers.com";
            var domain = new Domain(domainWithNumbers);
            domain.ToString().Should().Be(domainWithNumbers);
        }
    }
}