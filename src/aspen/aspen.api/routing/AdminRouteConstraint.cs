using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace aspen.api.Routing
{
    public class AdminRouteConstraint : IRouteConstraint
    {
        // public bool Match(HttpContext httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
        // {
        //     var splitAddress = httpContext.Request.Headers["Host"].Split('.');
        //     if (splitAddress.Length < 2)
        //     {
        //         return true;
        //     }
        //     //validate that path starts with /admin/{controller}...

        //     return false;
        // }

        public bool Match(HttpContext httpContext, IRouter route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection)
        {
            var splitAddress = httpContext.Request.Host.Host.Split('.');// Request.Headers["Host"].Split('.');
            if (splitAddress.Length < 2)
            {
                return true;
            }
            //validate that path starts with /admin/{controller}...

            return false;
        }
    }
}