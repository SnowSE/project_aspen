using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
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
                charity = new Charity(Guid.NewGuid(), charity.CharityName, charity.CharityDescription, charity.Domains);
                await dbConnection.ExecuteAsync(
                    @"insert into Charity (CharityId, CharityName, CharityDescription)
                    values (@CharityId, @CharityName, @CharityDescription);",
                    charity
                );

                foreach(var domain in charity.Domains)
                {
                    await dbConnection.ExecuteAsync(
                        @"insert into Domain (CharityId, CharityDomain)
                        values (@charityId, @charityDomain);",
                        new { charityId = charity.CharityId, charityDomain = domain.ToString()}
                    );
                }
            }
        }

        public async Task Update(Charity charity)
        {
            using (var dbConnection = getDbConnection())
            {
                await dbConnection.ExecuteAsync(
                    @"update Charity set
                    CharityName = @charityName,
                    CharityDescription = @charityDescription
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

        public async Task<Charity> GetByDomain(Domain domain)
        {
            using (var dbConnection = getDbConnection())
            {
                var charityId = await getCharityIdByDomain(domain, dbConnection);
                return await getCharityWithDomain(dbConnection, charityId);
            }
        }

        public async Task<Charity> GetById(Guid charityId)
        {
            using (var dbConnection = getDbConnection())
            {
                return await getCharityWithDomain(dbConnection, charityId);
            }
        }

        private static async Task<Charity> getCharityWithDomain(IDbConnection dbConnection, Guid charityId)
        {
            var charityDictionary = new Dictionary<Guid, Charity>();

            var list = await dbConnection.QueryAsync<Charity, Domain, Charity>(
                @"select * from Charity as c
                inner join Domain as d on d.charityId = c.charityId
                where c.charityid = @charityId",
                (dbCharity, dbDomain) =>
                {
                    // This lambda exists so that we never have to create a charity without a domain list
                    // we need this for immutability
                    // it is applied to each row in our query result
                    Charity charityEntry;
                    // if we have seen this charity before
                    if (!charityDictionary.TryGetValue(dbCharity.CharityId, out charityEntry))
                    {
                        charityEntry = dbCharity;
                        charityEntry = charityEntry.AppendDomain(dbDomain);
                        charityDictionary[charityEntry.CharityId] = charityEntry;
                    }
                    else
                    {
                        charityDictionary[dbCharity.CharityId] = charityDictionary[dbCharity.CharityId].AppendDomain(dbDomain);
                    }

                    return charityDictionary[dbCharity.CharityId];
                },
                new { charityId },
                splitOn: "charityId");
            return charityDictionary.Values.First();
        }

        private static async Task<Guid> getCharityIdByDomain(Domain domain, IDbConnection dbConnection)
        {
            return await dbConnection.QueryFirstAsync<Guid>(
                @"select charityId from Domain
                    where charityDomain = @charityDomain;",
                new { charityDomain = domain.ToString() }
            );
        }

        //canidate for optimization
        public IEnumerable<string> GetDomains()
        {
            using (var dbConnection = getDbConnection())
            {
                return dbConnection.Query<string>(
                    "select CharitySubDomain from Charity;"
                );
            }
        }

        public async Task Delete(Charity charity)
        {
            using (var dbConnection = getDbConnection())
            {
                await deleteDomains(charity, dbConnection);
                await deleteCharity(charity, dbConnection);
            }
        }

        private static async Task deleteCharity(Charity charity, IDbConnection dbConnection)
        {
            await dbConnection.ExecuteAsync(
                    @"delete from Charity
                    where CharityId = @charityId
                    and CharityName = @charityName;",
                    charity
                );
        }

        private static async Task deleteDomains(Charity charity, IDbConnection dbConnection)
        {
            await dbConnection.ExecuteAsync(
                    @"delete from Domain
                    where charityId = @charityId",
                    charity
                );
        }
    }
}