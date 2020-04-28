using System.Collections.Generic;
using Aspen.Core.Models;

namespace Aspen.Api.Services
{
    public interface IClaimsService
    {
        IEnumerable<bool> GetAll();
        object Authenticate(string username, string password);
    }
}