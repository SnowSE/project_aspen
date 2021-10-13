using System.Security.Claims;
using Api.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using NUnit.Framework;

namespace Tests.Controller
{
    public class AdminControllerTest
    {
        private AdminController adminController;
        private ClaimsPrincipal adminUser;

        [SetUp]
        public void Setup()
        {
            adminController = new AdminController();
            var userClaims = new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, "testAdmin"),
                new Claim(ClaimTypes.Role, "admin-aspen")
            };
            adminUser = new ClaimsPrincipal(
                new ClaimsIdentity(userClaims, "TestAuthentication")
            );
        }

        [Test]
        public void CanGetFromAdminController()
        {
            adminController.ControllerContext = new ControllerContext();
            adminController.ControllerContext.HttpContext = new DefaultHttpContext { User = adminUser };
            var userClaims = adminController.Get();
            userClaims.Should().NotBeEmpty();
        }
    }
}