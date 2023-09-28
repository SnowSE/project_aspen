using v2.Mappers;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Tests.Hooks;

namespace Tests
{
    public static class TestHelpers
    {
        public static IMapper AspenMapper { get; } = new Mapper(new MapperConfiguration(c => c.AddProfile<AspenMapperProfile>()));

        private static string GetConnectionString() =>
            Environment.GetEnvironmentVariable("ASPEN_TEST_CONNECTION_STRING") ?? TestHook.ConnectionString;

        public static AspenContext CreateContext() =>
            new AspenContext(new DbContextOptionsBuilder<AspenContext>().UseNpgsql(GetConnectionString()).Options);

        /* public static AspenContext CreateContext(string connectionString = "server=localhost; port=5434; database=postgres; user id=postgres; password=P@assword1") =>
             new AspenContext(new DbContextOptionsBuilder<AspenContext>().UseNpgsql(connectionString).Options); MaksadDB*/
    }
}