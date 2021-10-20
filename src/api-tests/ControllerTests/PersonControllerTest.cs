using System.Security.Claims;
using System.Threading.Tasks;
using Api.Controllers;
using Api.DataAccess;
using Api.DtoModels;
using Api.Mappers;
using Api.Models;
using Api.Models.Entities;
using api_tests;
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
    public class PersonControllerTest
    {
        private PersonController personController;

        [SetUp]
        public void Setup()
        {
            var context = TestHelpers.CreateContext();
            context.Database.Migrate();

            var personRepository = new PersonRepository(context, TestHelpers.AspenMapper);
            personController = new PersonController(personRepository, TestHelpers.AspenMapper);
        }

        [Test]
        public async Task CanCreatePerson()
        {
            var newPerson = new DtoPerson("George");
            var dtoPerson = (await personController.Add(newPerson)).Value;
            dtoPerson.ID.Should().NotBe("");
            dtoPerson.Name.Should().Be("George");
        }

        [Test]
        public async Task CanGetCreatedPerson() //eventually
        {
            var newPerson = new DtoPerson("George");
            var createdPerson = (await personController.Add(newPerson)).Value;
            var returnedPerson = (await personController.GetByID(createdPerson.ID)).Value;
            returnedPerson.Name.Should().Be("George");
        }

        [Test]
        public async Task CanGetDifferentPerson() //eventually
        {
            var newPerson = new DtoPerson("Ben");
            var createdPerson = (await personController.Add(newPerson)).Value;
            var returnedPerson = (await personController.GetByID(createdPerson.ID)).Value;
            returnedPerson.Name.Should().Be("Ben");
        }

        [Test]
        public async Task CanDeletePerson()
        {
            var newPerson = new DtoPerson("Ben");
            var createdPerson = (await personController.Add(newPerson)).Value;
            await personController.Delete(createdPerson.ID);
            var badPersonRequests = await personController.GetByID(createdPerson.ID);

            var actual = badPersonRequests.Result as NotFoundObjectResult;
            actual.StatusCode.Should().Be(404);
        }

        [Test]
        public async Task CanEditPerson()
        {
            var newPerson = new DtoPerson("Ben");
            var createdPerson = (await personController.Add(newPerson)).Value;

            var person = TestHelpers.AspenMapper.Map<Person>(createdPerson);
            var editedPerson = person.WithName("notBen").WithBio("new bio");
            await personController.Edit(TestHelpers.AspenMapper.Map<DtoPerson>(editedPerson));

            var returnedPerson = (await personController.GetByID(createdPerson.ID)).Value;
            returnedPerson.Name.Should().Be(editedPerson.Name);
        }
    }
}