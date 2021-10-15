using System.Security.Claims;
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
    public class PersonControllerTest
    {
        private PersonController personController;
        private IMapper aspenMapper = new Mapper(new MapperConfiguration(c => c.AddProfile<AspenMapperProfile>()));

        [SetUp]
        public void Setup()
        {
            var optionsBuilder = new DbContextOptionsBuilder<AspenContext>();
            optionsBuilder.UseNpgsql("Server=api_db;Database=aspen;User Id=aspen;Password=password;");
            var context = new AspenContext(optionsBuilder.Options);
            var personRepository = new PersonRepository(context, aspenMapper);            
            personController = new PersonController(personRepository, aspenMapper);
        }

        [Test]
        public async Task CanCreatePerson()
        {
            var newPerson = new DtoPerson("George");
            var ret = await personController.Add(newPerson);
            var returnedPerson = (ret.Result as OkObjectResult).Value as Person;
            returnedPerson.ID.Should().NotBe("");
            returnedPerson.Name.Should().Be("George");
        }
        [Test]
        public async Task CanGetCreatedPerson() //eventually
        {
            var newPerson = new DtoPerson("George");
            var createdResult = await personController.Add(newPerson);
            var createdPerson = (createdResult.Result as OkObjectResult).Value as Person;
            var gottedResult = await personController.GetByID(createdPerson.ID);
            var JONATHAN_Y_U_DO_DIS = (gottedResult.Result as OkObjectResult).Value as Person;
            JONATHAN_Y_U_DO_DIS.Name.Should().Be("George");
        }
        [Test]
        public async Task CanGetDifferentPerson() //eventually
        {
            var newPerson = new DtoPerson("Ben");
            var createdResult = await personController.Add(newPerson);
            var createdPerson = (createdResult.Result as OkObjectResult).Value as Person;
            var gottedResult = await personController.GetByID(createdPerson.ID);
            var JONATHAN_Y_U_DO_DIS = (gottedResult.Result as OkObjectResult).Value as Person;
            JONATHAN_Y_U_DO_DIS.Name.Should().Be("Ben");
        }
        
    }
}