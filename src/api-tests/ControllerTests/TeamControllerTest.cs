using System;
using System.Threading.Tasks;
using Api.Controllers;
using Api.DataAccess;
using Api.DtoModels;
using Api.Mappers;
using Api.Models;
using Api.Models.Entities;
using Aspen.Api.Controllers;
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
    public class TeamControllerTest
    {
        public static TeamController GetTeamController()
        {
            var context = TestHelpers.CreateContext();
            var TeamRepository = new TeamRepository(context, TestHelpers.AspenMapper);
            return new TeamController(TeamRepository, TestHelpers.AspenMapper);
        }

        [Test]
        public async Task CanCreateTeam()
        {
            var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event" })).Value;
            var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam" })).Value;
            var newTeam = new DtoTeam { Description = "George", OwnerID = newPerson.ID };
            var dtoTeam = (await GetTeamController().Add(newTeam, newEvent.ID)).Value;
            dtoTeam.ID.Should().NotBe(0);
            dtoTeam.Description.Should().Be("George");
        }

        [Test]
        public async Task CanGetDifferentTeam()
        {
            var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event" })).Value;
            var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam" })).Value;
            var newTeam = new DtoTeam { Description = "George", OwnerID = newPerson.ID };
            var dtoTeam = (await GetTeamController().Add(newTeam, newEvent.ID)).Value;

            var returnedTeam = (await GetTeamController().GetByID(dtoTeam.ID)).Value;
            returnedTeam.Description.Should().Be("George");
        }

        [Test]
        public async Task CanDeleteTeam()
        {
            var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event" })).Value;
            var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam" })).Value;
            var newTeam = new DtoTeam { Description = "George", OwnerID = newPerson.ID };
            var dtoTeam = (await GetTeamController().Add(newTeam, newEvent.ID)).Value;
            var returnedTeam = (await GetTeamController().GetByID(dtoTeam.ID)).Value;

            await GetTeamController().Delete(returnedTeam.ID);

            var badTeamRequests = await GetTeamController().GetByID(dtoTeam.ID);

            var actual = badTeamRequests.Result as BadRequestObjectResult;
            actual.StatusCode.Should().Be(400);
        }

        [Test]
        public async Task CanEditTeam()
        {
            var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event" })).Value;
            var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam" })).Value;
            var newTeam = new DtoTeam { Description = "George", OwnerID = newPerson.ID };
            var dtoTeam = (await GetTeamController().Add(newTeam, newEvent.ID)).Value;

            var editedTeam = dtoTeam with { Description = "Changed" };
            await GetTeamController().Edit(editedTeam);

            var returnedTeam = (await GetTeamController().GetByID(editedTeam.ID)).Value;
            returnedTeam.Description.Should().Be(editedTeam.Description);
        }
    }
}