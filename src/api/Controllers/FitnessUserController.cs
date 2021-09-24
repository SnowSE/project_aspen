using dotnet.DataAccess;
using dotnet.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    public class FitnessUserController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;

        public FitnessUserController(IDataRepository userRepository)
        {
            _dataRepository = userRepository;
        }

        [HttpGet("getall")]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _dataRepository.GetUsersAsync();
        }


        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                //Guid obj = Guid.NewGuid();
                //user.UserID = obj.ToString("n");
                if (!_dataRepository.UserExists(user.UserID))
                {
                    await _dataRepository.AddUserAsync(user);
                    return Ok();
                }
                else
                {

                    return BadRequest("User already exists");
                }
            }
            return BadRequest("User Object is not valid");
        }

        [HttpGet]
        public async Task<ActionResult<User>> GetUserByID(string userid)
        {
            if (_dataRepository.UserExists(userid))
            {
                return await _dataRepository.GetUserAsync(userid);
            }
            else
            {
                return BadRequest("User id does not exist");
            }
        }

        [HttpGet("login")]
        public async Task<ActionResult<User>> GetUserByUsernameAndPassword(string username, string password)
        {

            var user = await _dataRepository.LoginUserAsync(username, password);

            if (user == null)
            {
                return BadRequest("User with that username does not exist");
            }

            if (user.Password != password)
            {
                return BadRequest("Password did not match");
            }

            return user;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                await _dataRepository.EditUserAsync(user);
                return Ok();
            }
            return BadRequest("User object is not valid");
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(string userid)
        {
            if (_dataRepository.UserExists(userid))
            {
                await _dataRepository.DeleteUserAsync(userid);
                return Ok();
            }
            else
            {
                return BadRequest("User id does not exist");
            }

        }
    }
}
