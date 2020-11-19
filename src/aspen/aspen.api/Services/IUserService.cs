using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using aspen.core.Models;
using Aspen.Core.Models;

namespace Aspen.Api.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password, Guid charityId);
        Task<IEnumerable<User>> GetAll(Guid charityID);

        Task CreateUser(CreateUserRequest createUserRequest);

        Task DeleteUser(DeleteUserRequest deleteUserRequest);

        void UpdateUser(User user);

        void UpdateUserPassword(Guid userID, string newPassword);
    }
}