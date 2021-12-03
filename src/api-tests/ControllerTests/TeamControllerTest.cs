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
            var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent {Description = "New Event" })).Value;
            var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam" })).Value;
            var newTeam = new DtoTeam { Name = "New Team!", Description = "George", OwnerID = newPerson.ID, EventID = newEvent.ID, DonationTarget=500 };
            var dtoTeam = (await GetTeamController().Add(newTeam)).Value;
            dtoTeam.ID.Should().NotBe(0);
            dtoTeam.Description.Should().Be("George");
            dtoTeam.Name.Should().Be("New Team!");
            dtoTeam.DonationTarget.Should().Be(500);
        }

        [Test]
        public async Task CanGetDifferentTeam()
        {
            var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event" })).Value;
            var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam" })).Value;
            var newTeam = new DtoTeam { Name = "TeamGeorge", Description = "George", OwnerID = newPerson.ID, EventID = newEvent.ID };
            var dtoTeam = (await GetTeamController().Add(newTeam)).Value;

            var returnedTeam = (await GetTeamController().GetByID(dtoTeam.ID)).Value;
            returnedTeam.Description.Should().Be("George");
        }

        [Test]
        public async Task CanDeleteTeam()
        {
            var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event" })).Value;
            var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam" })).Value;
            var newTeam = new DtoTeam { Name = "TeamGeorge", Description = "George", OwnerID = newPerson.ID, EventID = newEvent.ID };
            var dtoTeam = (await GetTeamController().Add(newTeam)).Value;
            var returnedTeam = (await GetTeamController().GetByID(dtoTeam.ID)).Value;

            await GetTeamController().Delete(returnedTeam.ID);

            var badTeamRequests = await GetTeamController().GetByID(dtoTeam.ID);

            var actual = badTeamRequests.Result as NotFoundObjectResult;
            actual.StatusCode.Should().Be(404);
        }

        [Test]
        public async Task BadDeleteCallReturnsAppropriateResponse()
        {
            var badDeleteResult = await GetTeamController().Delete(-1);

            var result = badDeleteResult as NotFoundObjectResult;
            result.StatusCode.Should().Be(404);
            result.Value.Should().Be("Team id does not exist");
        }

        [Test]
        public async Task CanEditTeam()
        {
            var newEvent = (await EventControllerTest.GetEventController().Add(new DtoEvent { Description = "New Event" })).Value;
            var newPerson = (await PersonControllerTest.GetPersonController().Add(new DtoPerson { Name = "Adam" })).Value;
            var newTeam = new DtoTeam { Name = "TeamGeorge", Description = "George", OwnerID = newPerson.ID, EventID = newEvent.ID };
            var dtoTeam = (await GetTeamController().Add(newTeam)).Value;

            var editedTeam = dtoTeam with { Description = "Changed", DonationTarget = 1234 };
            await GetTeamController().Edit(editedTeam);

            var returnedTeam = (await GetTeamController().GetByID(editedTeam.ID)).Value;
            returnedTeam.Description.Should().Be(editedTeam.Description);
            returnedTeam.DonationTarget.Should().Be(1234);
        }
    }
}