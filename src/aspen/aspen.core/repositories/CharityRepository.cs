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

        public async Task Create(Charity charity)
        {
            using (var dbConnection = getDbConnection())
            {
                charity.CharityId = Guid.NewGuid();
                await dbConnection.ExecuteAsync(
                    @"insert into Charity (CharityId, CharityName, CharitySubDomain, CharityDescription)
                    values (@CharityId, @CharityName, @CharitySubDomain, @CharityDescription);",
                    charity
                );
            }
        }

        public async Task Update(Charity charity)
        {
            using(var dbConnection = getDbConnection())
            {
                await dbConnection.ExecuteAsync(
                    @"update Charity set
                    CharityName = @charityName,
                    CharityDescription = @charityDescription,
                    CharitySubDomain = @charitySubDomain
                    where CharityId = @charityId;",
                    charity
                );
            }
        }

        public async Task<IEnumerable<Charity>> GetAll()
        {
            using (var dbConnection = getDbConnection())
            {
                return await dbConnection.QueryAsync<Charity>(
                    "select * from Charity;"
                );
            }
        }

        public async Task<Charity> GetById(Guid charityId)
        {
            using (var dbConnection = getDbConnection())
            {
                return await dbConnection.QueryFirstAsync<Charity>(
                    @"select * from Charity
                    where CharityId = @charityId;",
                    new { charityId }
                );
            }
        }

        public async Task<Charity> GetByName(string charityName)
        {
            using (var dbConnection = getDbConnection())
            {
                return await dbConnection.QueryFirstAsync<Charity>(
                    @"select * from Charity
                    where CharityName = @charityName;",
                    new { charityName }
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

        public async Task Delete(Charity charity)
        {
            using(var dbConnection = getDbConnection())
            {
                await dbConnection.ExecuteAsync(
                    @"delete from Charity
                    where CharityId = @charityId
                        and CharityName = @charityName;",
                    charity
                );
            }
        }
    }
}