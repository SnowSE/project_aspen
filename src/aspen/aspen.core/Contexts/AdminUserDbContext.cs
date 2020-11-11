using Aspen.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace aspen.core.Contexts
{
    public class AdminUserDbContext : DbContext
    {
        private readonly DbContextOptions options;

        public AdminUserDbContext(DbContextOptions options)
        {
            this.options = options ?? throw new ArgumentNullException(nameof(options));
        }
        public DbSet<User> Users { get; set; }
    }
}
