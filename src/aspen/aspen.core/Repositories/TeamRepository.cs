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

        public async Task<InternalResult<bool>> Create(Team team, Charity charity)
        {
            using (var dbConnection = migrationService.GetDbConnection(charity.ConnectionString))
            {
                var affectedRows = await dbConnection.ExecuteAsync(
                    @"insert into team
                    values (@id, @name, @description);",
                    team
                );
                if (affectedRows == 1)
                    return InternalResult<bool>.Success(true);
                else
                    return InternalResult<bool>.Failure("Team not inserted into database");

            }
        }

        public async Task<InternalResult<IEnumerable<Team>>> GetByCharity(Charity charity)
        {
            using (var dbConnection = migrationService.GetDbConnection(charity.ConnectionString))
            {
                var teams = await dbConnection.QueryAsync<Team>(
                    @"select * from team;"
                );
                return InternalResult<IEnumerable<Team>>.Success(teams);
            }
        }

        public async Task<InternalResult<bool>> Delete(Team team, Charity charity)
        {
            using (var dbConnection = migrationService.GetDbConnection(charity.ConnectionString))
            {
                var affectedRows = await dbConnection.ExecuteAsync(
                    @"delete from team
                    where id = @id",
                    team
                );
                if (affectedRows == 1)
                    return InternalResult<bool>.Success(true);
                else
                    return InternalResult<bool>.Failure("Cannot delete, team does not exist");
            }
        }

        public async Task<InternalResult<Team>> Update(Team team, Charity charity)
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
                    return InternalResult<Team>.Success(team);
                else
                    return InternalResult<Team>.Failure("Could not update team, Id not found");
            }
        }
    }
}