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
using Api.Models.Entities;

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
            this.eventRepository = eventRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<DtoEvent>> GetAllEvents()
        {
            return mapper.Map<IEnumerable<DtoEvent>>(await eventRepository.GetEventsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DtoEvent>> GetEventByID(long id)
        {

            if (eventRepository.EventExists(id))
            {
                return mapper.Map<DtoEvent>(await eventRepository.GetEventByIdAsync(id));
            }
            else
            {
                return BadRequest("Event id does not exist");
            }
        }

        [HttpPost]
        public async Task<ActionResult<DtoEvent>> Add([FromBody] DtoEvent dtoEvent)
        {
            if (ModelState.IsValid)
            {
                var e = mapper.Map<Event>(dtoEvent);
                return mapper.Map<DtoEvent>(await eventRepository.AddEventAsync(e));
            }
            return BadRequest("Event object is not valid");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent([FromBody] DtoEvent dtoEvent, long id)
        {
            if (ModelState.IsValid)
            {
                var e = mapper.Map<Event>(dtoEvent);
                await eventRepository.EditEventAsync(e);
                return Ok("Event edit was successful");
            }
            return BadRequest("There was error editing the event");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(long id)
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
