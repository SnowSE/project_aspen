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
    public class UserWorkoutsController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;

        public UserWorkoutsController(IDataRepository userRepository)
        {
            _dataRepository = userRepository;
        }


        [HttpGet("getall")]
        public async Task<IEnumerable<UserWorkout>> GetAllUserWorkouts()
        {
            return await _dataRepository.GetUserWorkoutsListAsync();
        }

        [HttpGet]
        public async Task<IEnumerable<Workout>> GetUserWorkouts(string userid)
        {
            var userWorkout = await _dataRepository.GetUserWorkoutsAsync(userid);

            return userWorkout;
        }


        [HttpPost]
        public async Task<IActionResult> AddUserWorkout([FromBody] Workout workout, string userid)
        {
            if (ModelState.IsValid)
            {
                //Guid obj = Guid.NewGuid();
                //user.UserID = obj.ToString("n");
                await _dataRepository.AddUserWorkoutAsync(workout, userid);
                return Ok();
            }
            return BadRequest();
        }


        
        [HttpDelete]
        public async Task<IActionResult> DeleteUserWorkouts(string workoutid, string userid)
        {
            await _dataRepository.DeleteUserWorkoutAsync(workoutid, userid);


            return Ok();
        }

  
        [HttpDelete("deleteall")]
        public async Task<IActionResult> DeleteUserWorkoutList(string userid)
        {
            await _dataRepository.DeleteUserWorkoutListAsync(userid);


            return Ok();
        }

    }
}
