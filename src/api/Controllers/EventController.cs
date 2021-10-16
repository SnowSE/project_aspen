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
        private readonly IMapper mapper;

        public EventController(IEventRepository eventRepository, IMapper mapper)
        {
            this.mapper = mapper;
            this.eventRepository = eventRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<DtoEvent>> GetAllEvents()
        {
            var Events = await eventRepository.GetEventsAsync();
            return mapper.Map<IEnumerable<DbEvent>, IEnumerable<DtoEvent>>(Events);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DtoEvent>> GetEventByID(string id)
        {

            if (eventRepository.EventExists(id))
            {
                var dbEvent = await eventRepository.GetEventByIdAsync(id);

                return mapper.Map<DtoEvent>(dbEvent);
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
                    var dbEvent = mapper.Map<DbEvent>(e);
                    await eventRepository.AddEventAsync(dbEvent);
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
                var dbEvent = mapper.Map<DbEvent>(e);
                await eventRepository.EditEventAsync(dbEvent);
                return Ok("Event edit was successful");
            }
            return BadRequest("THere was error editing the event");
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
