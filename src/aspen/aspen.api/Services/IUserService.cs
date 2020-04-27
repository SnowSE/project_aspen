using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Aspen.Api.Http;
using Aspen.Core;
using Aspen.Core.Models;

namespace Aspen.Api.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        //Task<Result<User>> getValidUser(UserRequest request);
        Task<Result<User>> GetByUserId(Guid id);
    }
}