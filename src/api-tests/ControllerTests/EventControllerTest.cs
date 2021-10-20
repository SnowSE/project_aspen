using Api.Controllers;
using Api.DataAccess;
using Api.DtoModels;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api_tests.ControllerTests
{
    public class EventControllerTest
    {
        private EventController eventController;

        [SetUp]
        public void Setup()
        {
            var context = TestHelpers.CreateContext();
            context.Database.Migrate();

            var eventRepository = new EventRepository(context, TestHelpers.AspenMapper);
            eventController = new EventController(eventRepository);
        }

        [Test]
        public async Task CanCreateEvent()
        {
            var newEvent = new DtoEvent(){
                ID = Guid.NewGuid().ToString(),
                Description = "Marathon1",
                Location = "Snow"
            };

            var dtoEvent = (await eventController.AddEvent(newEvent)).Value;

            dtoEvent.ID.Should().Be(newEvent.ID);
            dtoEvent.Description.Should().Be("Marathon1");
        }

        [Test]
        public async Task CanGetCreatedEvent() //eventually
        {
            var newEvent = new DtoEvent()
            {
                ID = Guid.NewGuid().ToString(),
                Description = "Marathon2",
                Location = "Snow"
            };

            var createdEvent = (await eventController.AddEvent(newEvent)).Value;
            var returnedEvent = (await eventController.GetEventByID(createdEvent.ID)).Value;

            returnedEvent.ID.Should().Be(newEvent.ID);
            returnedEvent.Description.Should().Be("Marathon2");
        }

        [Test]
        public async Task CanEditCreatedEvent() //eventually
        {
            var newEvent = new DtoEvent()
            {
                ID = Guid.NewGuid().ToString(),
                Description = "Marathon2",
                Location = "Snow"
            };

            var createdEvent = (await eventController.AddEvent(newEvent)).Value;

            newEvent.Description = "This is changed";

            await eventController.EditEvent(newEvent, newEvent.ID);

            var returnedEvent = (await eventController.GetEventByID(createdEvent.ID)).Value;

            returnedEvent.Description.Should().Be("This is changed");
        }
    }
}
