using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Aspen.Api.Routing
{
    public class AdminRouteConstraint : IRouteConstraint
    {


        public bool Match(HttpContext httpContext, IRouter route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection)
        {
            var splitAddress = httpContext.Request.Host.Host.Split('.');
            var path = httpContext.Request.Path.ToString();

            if (hasNoSubDomain(splitAddress) && pathStartsWithAdmin(path))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private bool pathStartsWithAdmin(string path)
        {
            return path.StartsWith("/admin");
        }

        private static bool hasNoSubDomain(string[] splitAddress)
        {
            return splitAddress.Length == 1;
        }
    }
}