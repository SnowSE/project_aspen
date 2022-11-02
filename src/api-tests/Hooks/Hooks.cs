using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using TechTalk.SpecFlow;

namespace Tests.Hooks
{
    [Binding]
    public class Hooks
    {
        private static WebApplication host;
        public static int ExposedPort { get; private set; }

        [BeforeTestRun]
        public static void BeforeTestRun()
        {
            var builder = WebApplication.CreateBuilder(new[] {
                "--urls", "http://127.0.0.1:0",
                "--SwaggerBasePath", ""
            });
            host = builder.Build();

            host.Start();

            foreach (var address in host.Urls)
            {
                var parts = address.Split(':');
                ExposedPort = int.Parse(parts[2]);
            }
        }

        [AfterTestRun]
        public static void AfterTestRun()
        {
            host.StopAsync().Wait();
        }
    }
}
