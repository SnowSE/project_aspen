using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Aspen.CharityApi.Controllers;
using Aspen.CharityApi.Http;
using Aspen.Core;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using FluentAssertions;
using Moq;
using Newtonsoft.Json;
using NUnit.Framework;

namespace Aspen.Tests.ControllerTests
{
    public class TeamControllerTests
    {
        private Mock<ITeamRepository> teamRepoMoq;
        private Mock<ICharityRepository> charityRepoMoq;
        private TeamController teamController;
        private int salt;
        private Charity alexsTurtles;
        private Team turtlePower;
        private TeamRequest request;

        public TeamControllerTests()
        {    
            teamRepoMoq = new Mock<ITeamRepository>();
            charityRepoMoq = new Mock<ICharityRepository>();
            teamController = new TeamController(teamRepoMoq.Object, charityRepoMoq.Object);
        }

        [SetUp]
        public void SetUp()
        {
            var random = new Random();
            salt = random.Next();
            alexsTurtles = new Charity(
                Guid.NewGuid(),
                "Alex's Turtles" + salt,
                "alex likes turtles",
                new ConnectionString("Host=notlocalhost; Port=5433; Database=changeme; Username=changeme; Password=changeme;"),
                new Domain[]{ new Domain(salt+"alexsturtles.com")}
            );

            charityRepoMoq
                .Setup(cr => cr.GetById(alexsTurtles.CharityId))
                .ReturnsAsync(Result<Charity>.Success(alexsTurtles));

            turtlePower = new Team(
                Guid.NewGuid(),
                "Team Turtle Power" + salt,
                "TMNT"
            );
            
            request = new TeamRequest
            {
                CharityId = alexsTurtles.CharityId,
                team = turtlePower
            };
        }

        [Test]
        public async Task CanCreateTeam()
        {
            teamRepoMoq
                .Setup(tr => tr.Create(turtlePower, alexsTurtles))
                .ReturnsAsync(Result<bool>.Success(true));

            var response = await teamController.Create(request);
            response.Status.Should().Be(ApiResult.StatusConstants.Success);
            response.Data.Should().Be(true);
        }

        [Test]
        public async Task CanUpdateTeams()
        {
            teamRepoMoq
                .Setup(tr => tr.Update(turtlePower, alexsTurtles))
                .ReturnsAsync(Result<Team>.Success(turtlePower));
            
            var response = await teamController.Update(request);
            response.Status.Should().Be(ApiResult.StatusConstants.Success);
            response.Data.Should().Be(turtlePower);
        }

        [Test]
        public async Task CanDeleteTeam()
        {
            teamRepoMoq
                .Setup(tr => tr.Delete(turtlePower, alexsTurtles))
                .ReturnsAsync(Result<bool>.Success(true));
            
            var response = await teamController.Delete(request);
            response.Status.Should().Be(ApiResult.StatusConstants.Success);
            response.Data.Should().Be(true);
        }

        [Test]
        public async Task CanGetTeamsByCharityId()
        {
            IEnumerable<Team> teamList = new Team[] { turtlePower };
            teamRepoMoq
                .Setup(tr => tr.GetByCharity(alexsTurtles))
                .ReturnsAsync(Result<IEnumerable<Team>>.Success(teamList));

            var response = await teamController.GetByCharityId(alexsTurtles.CharityId);
            response.Status.Should().Be(ApiResult.StatusConstants.Success);
            response.Data.Should().Be(teamList);
        }
    }
}