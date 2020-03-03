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
                await dbConnection.ExecuteAsync(
                    @"insert into Charity (CharityId, CharityName, CharityDescription)
                    values (@CharityId, @CharityName,@CharityDescription);",
                    charity
                );
            }
        }
        public async Task<IEnumerable<Charity>> GetAll()
        {
            using (var dbConnection = getDbConnection())
            {
                return await dbConnection.QueryAsync<Charity>(
                    @"select * from Charity;"
                );
            }
        }

    }
}