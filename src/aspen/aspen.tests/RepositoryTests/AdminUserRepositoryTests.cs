using aspen.core.Contexts;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using Aspen.Core.Models;
namespace aspen.tests.RepositoryTests
{
    public class AdminUserRepositoryTests
    {
        [OneTimeSetUp]
        public void SetUp()
        {

        }

        [Test]
        public void GetAllAdminUsers()
        {
            var options = new DbContextOptionsBuilder<AdminUserDbContext>()
                .UseInMemoryDatabase(databaseName: "adminUserDatabase")
                .Options;



            using(var context = new AdminUserDbContext(options))
            {
                var sevenItems = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };

                context.Users.Add(new User (new Guid("b42c96ce-4da3-4e21-b1dc-fb3920043b0c"), "MyName", "MyLastName", "my.name", "abc", sevenItems, "token1" ));
                context.Users.Add(new User (new Guid("69aacc2f-d793-404e-94cb-986f6b6e73f5"), "Zach", "Reiss", "zach.reiss", "def", sevenItems, "token2"));
                context.Users.Add(new User (new Guid("21faf52e-7b34-4c34-ba14-6a49a072d514"), "Marcelo", "Zometa", "marcelo.zometa", "ghi", sevenItems, "token3"));
                context.Users.Add(new User (new Guid("6edfa2ae-b839-46e0-82c9-77fc98b7351c"), "Jonathan", "Allen", "jonathan.allen", "jkl", sevenItems, "token4"));
                context.Users.Add(new User (new Guid("b2b2d95a-bf42-4829-900e-b06cfb467751"), "Emmanuel", "Torres", "emmanuel.torres", "mno", sevenItems, "token5"));
                context.Users.Add(new User (new Guid("dda38172-4a4e-4ed4-bd1d-f6e6d8854651"), "Aaron", "Paniagua", "aaron.paniagua", "pqs", sevenItems, "token6"));
            }
        }
    }
}
