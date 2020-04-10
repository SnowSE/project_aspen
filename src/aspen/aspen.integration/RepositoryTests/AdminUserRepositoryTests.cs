using System;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Aspen.Core.Services;
using Aspen.Integration.Helpers;
using FluentAssertions;
using NUnit.Framework;

namespace Aspen.Integration.RepositoryTests
{
    [Category("AdminUser")]
    public class AdminUserRepositoryTests
    {
        private MigrationService migrationService;
        private AdminUserRepository adminUserRepo;
        private int salt;
        private User bobTheBuilder;

        [SetUp]
        public async Task SetUp()
        {
            bobTheBuilder = new User(
                Guid.NewGuid(), "bob", "thebuilder", "bobthebuilder", "12345abc", "", ""
            );

            await adminUserRepo.Create(bobTheBuilder);
        }

        public AdminUserRepositoryTests()
        {
            var connString = new ConnectionString(MigrationHelper.ConnectionString);
            migrationService = new MigrationService(connString, secure: false);
            var t = migrationService.ApplyMigrations(connString);
            t.Wait();

            adminUserRepo = new AdminUserRepository(migrationService);
        }

        [Test]
        public async Task CanGetUserFromDatabase(){
            var bobInDatabase = await adminUserRepo.Get(bobTheBuilder.Id);
            bobTheBuilder.Should().BeEquivalentTo(bobInDatabase);
        }

    }
}