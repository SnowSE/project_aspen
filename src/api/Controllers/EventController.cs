using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DtoModels;
using AutoMapper;
using Api.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.DbModels;

namespace Api.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            this.eventRepository = eventRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<DtoEvent>> GetAllEvents()
        {
            return await eventRepository.GetEventsAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DtoEvent>> GetEventByID(string id)
        {

            if (eventRepository.EventExists(id))
            {
                return await eventRepository.GetEventByIdAsync(id);
            }
            else
            {
                return BadRequest("Event id does not exist");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddEvent([FromBody] DtoEvent e)
        {

            if (ModelState.IsValid)
            {
                if (!eventRepository.EventExists(e.ID))
                {
                    await eventRepository.AddEventAsync(e);
                    return Ok("Event added successfully");
                }
                else
                {
                    return BadRequest("Event already exists");
                }
            }
            return BadRequest("Event object is not valid");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent([FromBody] DtoEvent e, string id)
        {
            if (ModelState.IsValid)
            {
                await eventRepository.EditEventAsync(e);
                return Ok("Event edit was successful");
            }
            return BadRequest("There was error editing the event");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(string id)
        {
            if (eventRepository.EventExists(id))
            {
                await eventRepository.DeleteEventAsync(id);
                return Ok("Delete event was successful");
            }
            else
            {
                return BadRequest("Event id does not exist");
            }
        }
    }
}
