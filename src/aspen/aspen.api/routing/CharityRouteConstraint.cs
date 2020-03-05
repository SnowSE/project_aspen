using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Aspen.Core.Repositories;
using System;
using System.Linq;
using System.Text.Json;

namespace aspen.api.Routing
{
    public class CharityRouteConstraint : IRouteConstraint
    {
        private readonly ICharityRepository charityRepository;

        public CharityRouteConstraint(ICharityRepository charityRepository)
        {
            this.charityRepository = charityRepository;
        }

        bool IRouteConstraint.Match(HttpContext httpContext, IRouter route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection)
        {
            var splitAddress = httpContext.Request.Host.Host.Split('.');
            var path = httpContext.Request.Path.ToString();

            if (hasSubDomain(splitAddress) 
                && pathDoesNotStartWithAdmin(path) 
                && isValidCharity(splitAddress[0]))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private bool pathDoesNotStartWithAdmin(string path)
        {
            return !path.StartsWith("/admin");
        }

        private bool isValidCharity(string requestedCharitySubDomain)
        {
            var allCharitySubDomains = charityRepository.GetSubDomains();
            return allCharitySubDomains.Contains(requestedCharitySubDomain);
        }

        private static bool hasSubDomain(string[] splitAddress)
        {
            return splitAddress.Length == 2;
        }
    }
}