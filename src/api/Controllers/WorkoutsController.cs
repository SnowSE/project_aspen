using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnet.DataAccess;
using dotnet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutsController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;

        public WorkoutsController(IDataRepository userRepository)
        {
            _dataRepository = userRepository;
        }

        [HttpGet("getall")]
        public async Task<IEnumerable<Workout>> GetAllWorkouts()
        {
            return await _dataRepository.GetWorkoutListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> AddWorkout([FromBody] Workout workout)
        {

            if (ModelState.IsValid)
            {
                //Guid obj = Guid.NewGuid();
                //user.UserID = obj.ToString("n");
                if (!_dataRepository.WorkoutExists(workout.WorkoutID))
                {
                    await _dataRepository.AddWorkoutAsync(workout);
                    return Ok();
                }
                else
                {
                    return BadRequest("Workout already exists");
                }
            }
            return BadRequest("User Object is not valid");
        }

        [HttpPut]
        public  async Task<IActionResult> EditWorkout([FromBody] Workout workout)
        {
            if (ModelState.IsValid)
            {
                await _dataRepository.EditWorkoutAsync(workout);
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet]
        public async Task<ActionResult<Workout>> GetWorkoutByID(string workoutid)
        {

            if (_dataRepository.WorkoutExists(workoutid))
            {
                return await _dataRepository.GetWorkoutAsync(workoutid);
            }
            else
            {
                return BadRequest("Workout id does not exist");
            }
        }



        [HttpDelete]
        public async Task<IActionResult> DeleteWorkout(string workoutid)
        {
            if (_dataRepository.WorkoutExists(workoutid))
            {
                 await _dataRepository.DeleteWorkoutAsync(workoutid);
                return Ok();
            }
            else
            {
                return BadRequest("Workout id does not exist");
            }
            
        }

    }
}
