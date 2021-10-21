using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using Api.Controllers;
using Api.DataAccess;
using Api.DtoModels;
using Api.Mappers;
using Api.Models;
using Api.Models.Entities;
using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using NUnit.Framework;

namespace Tests.Controller
{
    public class PageDataControllerTest
    {
        private PageDataController pageDataController;

        [SetUp]
        public void Setup()
        {
            var context = TestHelpers.CreateContext();
            var pageDataRepository = new PageDataRepository(context, TestHelpers.AspenMapper);
            pageDataController = new PageDataController(pageDataRepository);
        }

        [Test]
        public async Task CanCreatePageData()
        {
            var newPageData = new DtoPageData { Key="home", Data= JsonDocument.Parse("{\"key\": \"value1\"}")};
            var dtoPageData = ((await pageDataController.PostPageData(newPageData)).Result as CreatedAtActionResult).Value as DtoPageData;

            dtoPageData.Key.Should().Be("home");
            dtoPageData.Data.RootElement.GetProperty("key").GetString().Should().Be("value1");
        }

        [Test]
        public async Task CanGetDifferentPageData() //eventually
        {
            var newPageData = new DtoPageData { Key = "home2", Data = JsonDocument.Parse("{\"key2\": \"value2\"}") };
            var createdPageData = ((await pageDataController.PostPageData(newPageData)).Result as CreatedAtActionResult).Value as DtoPageData;
            var returnedPageData = (await pageDataController.GetPageData(createdPageData.Key)).Value;

            returnedPageData.Key.Should().Be("home2");
        }
    }
}