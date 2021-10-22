using System;
using System.Security.Claims;
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
    public class RegistrationControllerTest
    {
        private PersonRepository GetPersonRepository()
        {
            var context = TestHelpers.CreateContext();
            return new PersonRepository(context, TestHelpers.AspenMapper);
        }
        private TeamRepository GetTeamRepository()
        {
            var context = TestHelpers.CreateContext();
            return new TeamRepository(context, TestHelpers.AspenMapper);
        }
        private EventRepository GetEventRepository()
        {
            var context = TestHelpers.CreateContext();
            return new EventRepository(context, TestHelpers.AspenMapper);
        }

        public static RegistrationController GetRegistrationController()
        {
            var context = TestHelpers.CreateContext();
            var registrationRepository = new RegistrationRepository(context, TestHelpers.AspenMapper);
            return new RegistrationController(registrationRepository, TestHelpers.AspenMapper);
        }

        [Test]
        public async Task CanCreateRegistration()
        {
            var dtoRegistration = await createRegistration();

            dtoRegistration.CreationDate.Should().NotBe(null);
        }

        private async Task<DtoRegistration> createRegistration()
        {
            var owner = await GetPersonRepository().AddAsync("ben", null);
            var eventEntity = new Event(0, "Marathon1", new DateTime(2021, 6, 21));
            var newEvent = await GetEventRepository().AddEventAsync(eventEntity);
            var dtoTeam = new DtoTeam
            {
                OwnerID = owner.ID,
                EventID = newEvent.ID
            };

            var team = await GetTeamRepository().AddAsync(dtoTeam, newEvent.ID);
            var uncreatedDtoRegistration = new DtoRegistration
            {
                OwnerID = owner.ID,
                TeamID = team.ID
            };

            var dtoRegistration = (await GetRegistrationController().Add(uncreatedDtoRegistration)).Value;
            return dtoRegistration;
        }

        [Test]
        public async Task CanGetRegistrationById()
        {
            var original = await createRegistration();
            var anotherCopy = (await GetRegistrationController().GetByID(original.ID)).Value;
            anotherCopy.Should().BeEquivalentTo(original);
        }

    }
}