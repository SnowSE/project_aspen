using System.Collections.Generic;
using Aspen.Core.Models;

namespace Aspen.Api.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
    }
}