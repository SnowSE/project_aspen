using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Dapper;

namespace Aspen.Core.Repositories
{

    public class CharityRepository : ICharityRepository
    {
        private Func<IDbConnection> getDbConnection { get; }
        public CharityRepository(Func<IDbConnection> getDbConnection)
        {
            this.getDbConnection = getDbConnection;
        }

        public async Task CreateCharity(Charity charity)
        {
            using (var dbConnection = getDbConnection())
            {
                charity.CharityId = await GenerateCharityId(dbConnection);
                await dbConnection.ExecuteAsync(
                    @"insert into Charity (CharityId, CharityName, CharitySubDomain, CharityDescription)
                    values (@CharityId, @CharityName, @CharitySubDomain, @CharityDescription);",
                    charity
                );
            }
        }

        private async Task<int> GenerateCharityId(IDbConnection dbConnection)
        {
            var random = new Random();
            int duplicateId = -1;
            int testId = -1;
            while(duplicateId != 0)
            {
                testId = random.Next() % 1_000_000;
                duplicateId = await dbConnection.QueryFirstOrDefaultAsync<int>(
                    @"select CharityId from Charity where CharityId = @testId;",
                    new { testId }
                );
            }
            return testId;
        }
// kyler was here
        public async Task<IEnumerable<Charity>> GetAll()
        {
            using (var dbConnection = getDbConnection())
            {
                return await dbConnection.QueryAsync<Charity>(
                    @"select * from Charity;"
                );
            }
        }

        //canidate for optimization
        public IEnumerable<string> GetSubDomains()
        {
            using(var dbConnection = getDbConnection())
            {
                return dbConnection.Query<string>(
                    "select CharitySubDomain from Charity;"
                );
            }
        }

    }
}