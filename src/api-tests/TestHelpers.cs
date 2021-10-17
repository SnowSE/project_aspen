using Api.DataAccess;
using Api.Mappers;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api_tests
{
    public static class TestHelpers
    {
        public static IMapper AspenMapper { get; } = new Mapper(new MapperConfiguration(c => c.AddProfile<AspenMapperProfile>()));

        /*public static AspenContext CreateContext(string connectionString = "Server=localhost;Database=aspen;User Id=aspen;Password=password;") =>
            new AspenContext(new DbContextOptionsBuilder<AspenContext>().UseNpgsql(connectionString).Options);*/

        public static AspenContext CreateContext(string connectionString = "server=localhost; port=5434; database=postgres; user id=postgres; password=P@assword1") =>
            new AspenContext(new DbContextOptionsBuilder<AspenContext>().UseNpgsql(connectionString).Options);
    }
}