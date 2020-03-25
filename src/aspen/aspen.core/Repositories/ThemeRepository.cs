using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Dapper;
using Newtonsoft.Json;

namespace Aspen.Core.Repositories
{

    public class ThemeRepository : IThemeRepository
    {
        private readonly Func<IDbConnection> getDbConnection;

        public ThemeRepository(Func<IDbConnection> getDbConnection)
        {
            this.getDbConnection = getDbConnection;
        }

        public async Task Create(Theme theme)
        {
            using (var dbConnection = getDbConnection())
            {
                await dbConnection.ExecuteAsync(
                    @"insert into Theme (charityid, primarymaincolor, primarylightcolor, primarycontrastcolor, secondarymaincolor, fontfamily)
                        values (@charityid, @primarymaincolor, @primarylightcolor, @primarycontrastcolor, @secondarymaincolor, @fontfamily);",
                    theme
                );
            }
        }

        public async Task<Theme> GetByCharityId(Guid charityId)
        {
            using (var dbConnection = getDbConnection())
            {
                return await dbConnection.QueryFirstAsync<Theme>(
                    @"select * from Theme
                        where Theme.CharityId = @charityId;",
                    new { charityId }
                );
            }
        }

        public async Task<IEnumerable<Theme>> GetAll()
        {
            using (var dbConnection = getDbConnection())
            {
                return await dbConnection.QueryAsync<Theme>(
                    @"select * from Theme;"
                );
            }
        }

        public async Task Update(Theme theme)
        {
            using (var dbConnection = getDbConnection())
            {
                await dbConnection.ExecuteAsync(
                    @"update Theme set
                        PrimaryMainColor = @PrimaryMainColor,
                        PrimaryLightColor = @PrimaryLightColor,
                        PrimaryContrastColor = @PrimaryContrastColor,
                        SecondaryMainColor = @SecondaryMainColor,
                        FontFamily = @FontFamily
                    where CharityId = @CharityId;",
                    theme
                );
            }
        }

        public async Task Delete(Guid charityId)
        {
            using (var dbConnection = getDbConnection())
            {
                await dbConnection.ExecuteAsync(
                    @"delete from Theme
                        where CharityId = @charityId;",
                    new { charityId }
                );
            }
        }

        //update

        //delete
    }
}