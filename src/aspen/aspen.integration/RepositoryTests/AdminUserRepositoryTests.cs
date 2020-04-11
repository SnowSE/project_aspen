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
            var rand = new Random();
            var usernameSalt = rand.Next();
            bobTheBuilder = new User(
                Guid.NewGuid(), "bob", "thebuilder", "bobthebuilder"+usernameSalt, "12345abc", new byte[]{}, ""
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
        public async Task CanGetUserFromDatabase()
        {
            var result = await adminUserRepo.Get(bobTheBuilder.Id);
            var bobInDatabase = result.State;
            bobTheBuilder.Should().BeEquivalentTo(bobInDatabase);
        }

        [Test]
        public async Task CanUpdateUserInDatabase()
        {
            var newJoe = bobTheBuilder.UpdateFirstName("joe");
            await adminUserRepo.Update(newJoe);
            var result = await adminUserRepo.Get(newJoe.Id);
            var joeFromDatabase = result.State;
            joeFromDatabase.Should().BeEquivalentTo(newJoe);
        }

        [Test]
        public async Task CanDeleteUserFromDatabase()
        {
            await adminUserRepo.Delete(bobTheBuilder);
            var allUsers = await adminUserRepo.GetAll();
            allUsers.Should().NotContain(bobTheBuilder);
        }

        [Test]
        public async Task GracefullyHandlesInsertingDuplicateUsers()
        {
            var response = await adminUserRepo.Create(bobTheBuilder);
            response.IsFailure.Should().BeTrue();
            response.Error.Should().Be("User already exists in database");
        }

        [Test]
        public async Task GracefullyHandlesGettingUnexistentUserId()
        {
            var response = await adminUserRepo.Get(Guid.NewGuid());
            response.IsFailure.Should().BeTrue();
            response.Error.Should().Be("User does not exist in database");
        }

        [Test]
        public async Task GracefullyHandlesUpdatingUnexistentUserId()
        {
            bobTheBuilder = bobTheBuilder.UpdateId(Guid.NewGuid());
            var response = await adminUserRepo.Update(bobTheBuilder);
            response.IsFailure.Should().BeTrue();
            response.Error.Should().Be("User does not exist in database");
        }

        [Test]
        public async Task GracefullyHandlesDeletingUnexistentUser()
        {
            bobTheBuilder = bobTheBuilder.UpdateId(Guid.NewGuid());
            var response = await adminUserRepo.Delete(bobTheBuilder);
            response.IsFailure.Should().BeTrue();
            response.Error.Should().Be("User does not exist in database");
        }
    }
}