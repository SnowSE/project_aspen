using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aspen.Api.DbModels;
using Aspen.Api.DtoModels;
using AutoMapper;
using dotnet.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;

        public EventController(IEventRepository eventRepository, IMapper mapper)
        {
            _mapper = mapper;
            _eventRepository = eventRepository;
        }

        /*[HttpGet("getall")]
        public async Task<IEnumerable<DtoEvent>> GetAllEvents()
        {
            return await _eventRepository.GetEventsAsync();
        }*/

        [HttpGet]
        public async Task<ActionResult<DtoEvent>> GetEventByID(string eventID)
        {

            if (_eventRepository.EventExists(eventID))
            {
                var dbEvent = await _eventRepository.GetEventAsync(eventID);

                return _mapper.Map<DtoEvent>(dbEvent);
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
                if (!_eventRepository.EventExists(e.ID))
                {   var dbEvent = _mapper.Map<DbEvent>(e);
                    await _eventRepository.AddEventAsync(dbEvent);
                    return Ok();
                }
                else
                {
                    return BadRequest("Event already exists");
                }
            }
            return BadRequest("Event object is not valid");
        }

        [HttpPut]
        public  async Task<IActionResult> EditEvent([FromBody] DtoEvent e)
        {
            if (ModelState.IsValid)
            {
                var dbEvent = _mapper.Map<DbEvent>(e);
                await _eventRepository.EditEventAsync(dbEvent);
                return Ok();
            }
            return BadRequest();
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteEvent(string eventID)
        {
            if (_eventRepository.EventExists(eventID))
            {
                 await _eventRepository.DeleteEventAsync(eventID);
                return Ok();
            }
            else
            {
                return BadRequest("Event id does not exist");
            }
            
        }

    }
}
