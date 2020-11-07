using System;
using System.Collections.Generic;
using aspen.core.Models;
using Aspen.Core.Models;

namespace Aspen.Api.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();

        void CreateUser(CreateUserRequest createUserRequest, Guid charityID);

        void DeleteUser(User user);

        void UpdateUser(User user);

        void UpdateUserPassword(Guid userID, string newPassword);
    }
}