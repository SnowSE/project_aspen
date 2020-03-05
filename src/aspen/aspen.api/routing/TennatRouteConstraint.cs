using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace aspen.api.Routing
{
    public class TenantRouteConstraint : IRouteConstraint
    {
        // public bool Match(HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
        // {
        //     var splitAddress = httpContext.Request.Headers["Host"].Split('.');
        //     if (splitAddress.Length < 2)
        //     {
        //         return false;
        //     }
        //     //validate that path is not /admin/...
        //     //validate that subdomain is actual tennat

        //     // var tenantSubdomain = fullAddress[0];
        //     // // var tenantId = ... // Lookup tenant id (preferably use a cache) 

        //     // if (!values.ContainsKey("tenant"))
        //     // {
        //     //     values.Add("tenant", tenantId);
        //     // }

        //     return true;
        // }

        bool IRouteConstraint.Match(HttpContext httpContext, IRouter route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection)
        {
            var splitAddress = httpContext.Request.Host.Host.Split('.');
            if (splitAddress.Length < 2)
            {
                return false;
            }
            return true;
        }
    }
}