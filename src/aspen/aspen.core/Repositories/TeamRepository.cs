using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Aspen.Core.Services;
using Dapper;

namespace Aspen.Core.Repositories
{

    public class TeamRepository : ITeamRepository
    {
        private readonly IMigrationService migrationService;

        public TeamRepository(IMigrationService migrationService)
        {
            this.migrationService = migrationService;
        }

        public async Task<Result<bool>> Create(Team team, Charity charity)
        {
            using (var dbConnection = migrationService.GetDbConnection(charity.ConnectionString))
            {
                var affectedRows = await dbConnection.ExecuteAsync(
                    @"insert into team
                    values (@id, @name, @description);",
                    team
                );
                if (affectedRows == 1)
                    return Result<bool>.Success(true);
                else
                    return Result<bool>.Failure("Team not inserted into database");

            }
        }

        public async Task<Result<IEnumerable<Team>>> GetByCharity(Charity charity)
        {
            using (var dbConnection = migrationService.GetDbConnection(charity.ConnectionString))
            {
                var teams = await dbConnection.QueryAsync<Team>(
                    @"select * from team;"
                );
                return Result<IEnumerable<Team>>.Success(teams);
            }
        }

        public async Task<Result<bool>> Delete(Team team, Charity charity)
        {
            using (var dbConnection = migrationService.GetDbConnection(charity.ConnectionString))
            {
                var affectedRows = await dbConnection.ExecuteAsync(
                    @"delete from team
                    where id = @id",
                    team
                );
                if (affectedRows == 1)
                    return Result<bool>.Success(true);
                else
                    return Result<bool>.Failure("Cannot delete, team does not exist");
            }
        }

        public async Task<Result<Team>> Update(Team team, Charity charity)
        {
            using (var dbConnection = migrationService.GetDbConnection(charity.ConnectionString))
            {
                var affectedRows = await dbConnection.ExecuteAsync(
                    @"update team set
                        name = @name,
                        description = @description
                    where id = @id",
                    team
                );
                if (affectedRows == 1)
                    return Result<Team>.Success(team);
                else
                    return Result<Team>.Failure("Could not update team, Id not found");
            }
        }
    }
}