using Api;
using Microsoft.Extensions.Hosting;
using TechTalk.SpecFlow;

namespace Tests.Hooks
{
    [Binding]
    public class Hooks
    {
        private static IHost host;
        public static int ExposedPort { get; private set; }

        [BeforeTestRun]
        public static void BeforeTestRun()
        {
            var inDocker = Environment.GetEnvironmentVariable("ASPEN_TEST_CONNECTION_STRING") != null;

            host = Program.CreateHostBuilder(new[] {
                "--urls", "http://127.0.0.1:0",
                inDocker ? "--ASPEN_CONNECTION_STRING" : "",
                inDocker ? Environment.GetEnvironmentVariable("ASPEN_TEST_CONNECTION_STRING") : "",
                "--SwaggerBasePath", ""
            }).Build();

            host.Start();
            foreach (var address in Startup.HostedAddresses)
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
