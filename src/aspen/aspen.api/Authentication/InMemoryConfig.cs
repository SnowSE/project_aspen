using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace Aspen.Api.Authentication
{
    // https://www.codeproject.com/Tips/5248033/Getting-Started-with-IdentityServer4-Quick-Referen
    // https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-3.1&tabs=netcore-cli
    // http://docs.identityserver.io/en/latest/quickstarts/3_aspnetcore_and_apis.html
    public static class InMemoryConfig
    {
        public static IEnumerable<IdentityResource> GetIdentityResources() =>
            new List<IdentityResource>()
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResource("api1", new string[] { "given_name" })
            };
        public static IEnumerable<ApiResource> GetApiResources() =>
            new List<ApiResource>
            {
                new ApiResource("api", "my api name")
            };

        public static List<TestUser> GetUsers() =>
            new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "a9ea0f25-b964-409f-bcce-c923266249b4",
                    Username = "Mick",
                    Password = "MickPassword",
                    Claims = new List<Claim>
                    {
                        new Claim("given_name", "Mick"),
                        new Claim("family_name", "Mining")
                    }
                },
                new TestUser
                {
                    SubjectId = "c95ddb8c-79ec-488a-a485-fe57a1462340",
                    Username = "Jane",
                    Password = "JanePassword",
                    Claims = new List<Claim>
                    {
                        new Claim("given_name", "Jane"),
                        new Claim("family_name", "Downing")
                    }
                }
            };


        public static IEnumerable<Client> GetClients() =>
            new List<Client>
            {
                new Client
                {
                    ClientId = "mvc client id",
                    ClientSecrets = new [] { new Secret("clientsecret".Sha512()) },
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials.Append("authorization_code").ToArray(),
                    AllowedScopes = { IdentityServerConstants.StandardScopes.OpenId,  "api1", "profile"},
                    RedirectUris = new string[] { "http://localhost:5000/signin-oidc" }
                },
                // new Client
                // {
                //     ClientId = "mvc",
                //     ClientSecrets = { new Secret("secret".Sha256()) },

                //     AllowedGrantTypes = GrantTypes.Code,
                //     RequireConsent = false,
                //     RequirePkce = true,

                //     // where to redirect to after login
                //     RedirectUris = { "http://localhost:5002/signin-oidc" },

                //     // where to redirect to after logout
                //     PostLogoutRedirectUris = { "http://localhost:5002/signout-callback-oidc" },

                //     AllowedScopes = new List<string>
                //     {
                //         IdentityServerConstants.StandardScopes.OpenId,
                //         IdentityServerConstants.StandardScopes.Profile,
                //         "api1"
                //     },

                //     AllowOfflineAccess = true
                // }
            };
    }

}