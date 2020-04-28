using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Aspen.Core.Models;
using Aspen.Api.Helpers;


namespace Aspen.Api.Services
{
    public class ClaimsService : IClaimsService
    {
        public object Authenticate(string username, string password)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<bool> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}