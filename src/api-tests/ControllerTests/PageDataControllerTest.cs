using System;
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
            var keyName = Guid.NewGuid().ToString();
            var newPageData = new DtoPageData { Key=keyName, Data= JsonDocument.Parse("{\"key\": \"value1\"}")};
            var dtoPageData = ((await pageDataController.Post(newPageData)).Result as CreatedAtActionResult).Value as DtoPageData;

            dtoPageData.Key.Should().Be(keyName);
            dtoPageData.Data.RootElement.GetProperty("key").GetString().Should().Be("value1");
        }

        [Test]
        public async Task CanGetDifferentPageData() //eventually
        {
            var keyName = Guid.NewGuid().ToString();
            var newPageData = new DtoPageData { Key = keyName, Data = JsonDocument.Parse("{\"key2\": \"value2\"}") };
            var createdPageData = ((await pageDataController.Post(newPageData)).Result as CreatedAtActionResult).Value as DtoPageData;
            var returnedPageData = (await pageDataController.GetByKey(createdPageData.Key)).Value;

            returnedPageData.Key.Should().Be(keyName);
        }
    }
}