using Api.DataAccess;
using Api.Mappers;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public static class TestHelpers
    {
        public static IMapper AspenMapper { get; } = new Mapper(new MapperConfiguration(c => c.AddProfile<AspenMapperProfile>()));

        private static string GetConnectionString() =>
            Environment.GetEnvironmentVariable("ASPEN_TEST_CONNECTION_STRING") ?? "Server=api_db;Database=aspen;User Id=aspen;Password=password;";

        public static AspenContext CreateContext() =>
            new AspenContext(new DbContextOptionsBuilder<AspenContext>().UseNpgsql(GetConnectionString()).Options);

        /* public static AspenContext CreateContext(string connectionString = "server=localhost; port=5434; database=postgres; user id=postgres; password=P@assword1") =>
             new AspenContext(new DbContextOptionsBuilder<AspenContext>().UseNpgsql(connectionString).Options); MaksadDB*/
    }
}