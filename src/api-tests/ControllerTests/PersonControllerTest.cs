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
        public PersonController GetPersonController()
        {
            var context = TestHelpers.CreateContext();
            var personRepository = new PersonRepository(context, TestHelpers.AspenMapper);
            return new PersonController(personRepository, TestHelpers.AspenMapper);
        }

        [Test]
        public async Task CanCreatePerson()
        {
            var newPerson = new DtoPerson("George");
            var dtoPerson = (await GetPersonController().Add(newPerson)).Value;
            dtoPerson.ID.Should().NotBe(0);
            dtoPerson.Name.Should().Be("George");
        }

        [Test]
        public async Task CanGetCreatedPerson() //eventually
        {
            var newPerson = new DtoPerson("George");
            var createdPerson = (await GetPersonController().Add(newPerson)).Value;
            var returnedPerson = (await GetPersonController().GetByID(createdPerson.ID)).Value;
            returnedPerson.Name.Should().Be("George");
        }

        [Test]
        public async Task CanGetDifferentPerson() //eventually
        {
            var newPerson = new DtoPerson("Ben");
            var createdPerson = (await GetPersonController().Add(newPerson)).Value;
            var returnedPerson = (await GetPersonController().GetByID(createdPerson.ID)).Value;
            returnedPerson.Name.Should().Be("Ben");
        }

        [Test]
        public async Task CanDeletePerson()
        {
            var newPerson = new DtoPerson("Ben");
            var createdPerson = (await GetPersonController().Add(newPerson)).Value;
            await GetPersonController().Delete(createdPerson.ID);
            var badPersonRequests = await GetPersonController().GetByID(createdPerson.ID);

            var actual = badPersonRequests.Result as NotFoundObjectResult;
            actual.StatusCode.Should().Be(404);
        }

        [Test]
        public async Task CanEditPerson()
        {
            var newPerson = new DtoPerson("Ben");
            var createdPerson = (await GetPersonController().Add(newPerson)).Value;

            var person = TestHelpers.AspenMapper.Map<Person>(createdPerson);
            var editedPerson = person.WithName("notBen").WithBio("new bio");
            await GetPersonController().Edit(TestHelpers.AspenMapper.Map<DtoPerson>(editedPerson));

            var returnedPerson = (await GetPersonController().GetByID(createdPerson.ID)).Value;
            returnedPerson.Name.Should().Be(editedPerson.Name);
        }
    }
}