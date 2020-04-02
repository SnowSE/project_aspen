using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Dapper;
using Newtonsoft.Json;

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
                var charityConnectionString = new ConnectionString(dbConnection.ConnectionString);
                await createCharityDatabase(charity, dbConnection, charityConnectionString);
                await createCharityDatabaseUser(charity, dbConnection, charityConnectionString);

                charity = await createCharityInDb(charity, dbConnection);
                //do not create charity if it has no domains
                //very bad if this happens
                //TODO: FIX THIS
                await createDomains(charity, dbConnection);
            }
        }

        private static async Task createCharityDatabaseUser(Charity charity, IDbConnection dbConnection, ConnectionString charityConnString)
        {
            // use stored procedure in database
            var dbUser = "charity_" + charity.CharityId.ToString().Replace("-", "");
            charityConnString = charityConnString.UpdateUser(dbUser);
            await dbConnection.ExecuteAsync(
                @"create user " + dbUser + " with password 'mypass';",
                new { dbUser }
            );
        }

        private static async Task createCharityDatabase(Charity charity, IDbConnection dbConnection, ConnectionString charityConnString)
        {
            // use stored procedure in database
            var dbName = "charity_" + charity.CharityId.ToString().Replace("-", "");
            await dbConnection.ExecuteAsync(
                // TODO: check for injection attacks
                // no user input is in the dbname, but I'm still scared
                "create database " + dbName + ";"
            );
        }

        private static async Task<Charity> createCharityInDb(Charity charity, IDbConnection dbConnection)
        {
            await dbConnection.ExecuteAsync(
                @"insert into Charity (CharityId, CharityName, CharityDescription, ConnectionString)
                    values (@CharityId, @CharityName, @CharityDescription, @ConnectionString);",
                charity
            );
            return charity;
        }

        private static async Task createDomains(Charity charity, IDbConnection dbConnection)
        {
            foreach (var domain in charity.Domains)
            {
                await dbConnection.ExecuteAsync(
                    @"insert into Domain (CharityId, CharityDomain)
                        values (@charityId, @charityDomain);",
                    new { charityId = charity.CharityId, charityDomain = domain.ToString() }
                );
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
                // return await dbConnection.QueryAsync<Charity>(
                //     @"select * from Charity;"
                // );
                var charityDict = new Dictionary<Guid, Charity>();

                await dbConnection.QueryAsync<Charity, Domain, Charity>(
                    @"select * from Charity as c
                        inner join Domain as d on c.charityid = d.charityid;",
                    (dbCharity, dbDomain) =>
                    {
                        charityDict[dbCharity.CharityId] = charityDict.ContainsKey(dbCharity.CharityId)
                            ? charityDict[dbCharity.CharityId].AppendDomain(dbDomain)
                            : dbCharity.AppendDomain(dbDomain);

                        return dbCharity;
                    },
                    splitOn: "charityId"
                );
                return charityDict.Values;
            }
        }

        public async Task<Result<Charity>> GetByDomain(Domain domain)
        {
            using (var dbConnection = getDbConnection())
            {
                try
                {
                    var charityId = await getCharityIdByDomain(domain, dbConnection);
                    var charity = await getCharityWithDomain(dbConnection, charityId);
                    return Result<Charity>.Success(charity);
                }
                catch(InvalidOperationException e)
                {
                    if(e.Message == "Sequence contains no elements")
                        return Result<Charity>.Failure("Domain does not exist");
                    else
                        return Result<Charity>.Failure(e.Message);
                }
            }
        }

        public async Task<Result<Charity>> GetById(Guid charityId)
        {
            using (var dbConnection = getDbConnection())
            {
                var charity = await getCharityWithDomain(dbConnection, charityId);
                return charity != null
                    ? Result<Charity>.Success(charity)
                    : Result<Charity>.Failure("Charity id does not exist");
            }
        }

        private static async Task<Charity> getCharityWithDomain(IDbConnection dbConnection, Guid charityId)
        {
            Charity charity = null;

            var list = await dbConnection.QueryAsync<Charity, Domain, Charity>(
                @"select * from Charity as c
                inner join Domain as d on d.charityId = c.charityId
                where c.charityid = @charityId;",
                // This lambda exists so that we never have to create a charity without a domain list
                // we need this for immutability
                // it is applied to each row in our query result
                (dbCharity, dbDomain) =>
                {
                    charity = charity == null
                        ? dbCharity.AppendDomain(dbDomain)
                        : charity.AppendDomain(dbDomain);

                    return charity;
                },
                new { charityId },
                splitOn: "charityId");
            return charity;
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

        public async Task<Result<bool>> Delete(Charity charity)
        {
            using (var dbConnection = getDbConnection())
            {
                return await Result<Charity>.Success(charity)
                    .ApplyAsync(async c => await deleteDomains(c, dbConnection))
                    .ApplyAsync(async c => await deleteCharity(c, dbConnection));
            }
        }

        private static async Task<Result<bool>> deleteCharity(Charity charity, IDbConnection dbConnection)
        {
            var rowsAffected = await dbConnection.ExecuteAsync(
                    @"delete from Charity
                    where CharityId = @charityId;",
                    charity
                );

            if(rowsAffected == 0)
                return Result<bool>.Failure("Cannot delete non-existant charity.");
            return Result<bool>.Success(true);
        }

        private static async Task<Result<Charity>> deleteDomains(Charity charity, IDbConnection dbConnection)
        {
            await dbConnection.ExecuteAsync(
                    @"delete from Domain
                    where charityId = @charityId;",
                    charity
                );
            return Result<Charity>.Success(charity);
        }
    }
}