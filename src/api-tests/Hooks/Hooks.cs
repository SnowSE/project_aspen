using Api;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            host = Program.CreateHostBuilder(new[] {"--urls", "http://127.0.0.1:0"}).Build();
            host.Start();
            foreach(var address in Api.Startup.HostedAddresses)
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
