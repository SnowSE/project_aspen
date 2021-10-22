using Api.Controllers;
using Api.DataAccess;
using Api.DtoModels;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Controller
{
    public class EventControllerTest
    {
        public static EventController GetEventController()
        {
            var context = TestHelpers.CreateContext();
            var eventRepository = new EventRepository(context, TestHelpers.AspenMapper);
            return new EventController(eventRepository, TestHelpers.AspenMapper);
        }

        [Test]
        public async Task CanCreateEvent()
        {
            var newEvent = new DtoEvent
            {
                Description = "Marathon1",
                Location = "Snow"
            };

            var eventController = GetEventController();
            var dtoEvent = (await eventController.Add(newEvent)).Value;

            dtoEvent.ID.Should().NotBe(0);
            dtoEvent.Description.Should().Be("Marathon1");
        }

        [Test]
        public async Task CanGetCreatedEvent() //eventually
        {
            var newEvent = new DtoEvent()
            {
                Description = "Marathon2",
                Location = "Snow"
            };

            var eventController = GetEventController();
            var createdEvent = (await eventController.Add(newEvent)).Value;
            var returnedEvent = (await eventController.GetEventByID(createdEvent.ID)).Value;

            returnedEvent.ID.Should().NotBe(0);
            returnedEvent.Description.Should().Be("Marathon2");
        }

        [Test]
        public async Task CanEditCreatedEvent() //eventually
        {
            var newEvent = new DtoEvent()
            {
                Description = "Marathon2",
                Location = "Snow"
            };

            var createdEvent = (await GetEventController().Add(newEvent)).Value;

            var changedEvent = createdEvent with { Description = "This is changed" };
            await GetEventController().EditEvent(changedEvent, changedEvent.ID);

            var returnedEvent = (await GetEventController().GetEventByID(createdEvent.ID)).Value;
            returnedEvent.Description.Should().Be("This is changed");
        }
    }
}
