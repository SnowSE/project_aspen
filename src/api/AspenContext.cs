using Api.DatabaseModels;
using Microsoft.EntityFrameworkCore;

namespace Aspen.Api
{
    public class AspenContext : DbContext
    {
        public AspenContext(DbContextOptions<AspenContext> dbContextOptions) : base(dbContextOptions)
        {            
        }

        public DbSet<PageData> PageData{get;set;}
    }
}