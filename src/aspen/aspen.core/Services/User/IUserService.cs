using System.Collections.Generic;
using Aspen.Core.Models;

namespace Aspen.Core.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
    }
}