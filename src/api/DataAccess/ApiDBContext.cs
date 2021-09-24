using dotnet.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet.DataAccess
{
    public class ApiDBContext : DbContext
    {
        public ApiDBContext(DbContextOptions<ApiDBContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<UserWorkout> UserWorkouts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<UserWorkout>()
                .HasOne(pt => pt.Workout)
                .WithMany(p => p.UserWorkouts)
                .HasForeignKey(pt => pt.WorkoutID);

            modelBuilder.Entity<UserWorkout>()
                .HasOne(pt => pt.User)
                .WithMany(t => t.UserWorkouts)
                .HasForeignKey(pt => pt.UserID);
        }
    }
}
