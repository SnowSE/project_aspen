﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using dotnet.DataAccess;

namespace dotnet.Migrations
{
    [DbContext(typeof(ApiDBContext))]
    partial class ApiDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("dotnet.Models.User", b =>
                {
                    b.Property<string>("UserID")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("JoinedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.HasKey("UserID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("dotnet.Models.UserWorkout", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("IsPublic")
                        .HasColumnType("boolean");

                    b.Property<string>("UserID")
                        .HasColumnType("text");

                    b.Property<string>("WorkoutID")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserID");

                    b.HasIndex("WorkoutID");

                    b.ToTable("UserWorkouts");
                });

            modelBuilder.Entity("dotnet.Models.Workout", b =>
                {
                    b.Property<string>("WorkoutID")
                        .HasColumnType("text");

                    b.Property<string>("Category")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<bool>("IsPublic")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("WorkoutID");

                    b.ToTable("Workouts");
                });

            modelBuilder.Entity("dotnet.Models.UserWorkout", b =>
                {
                    b.HasOne("dotnet.Models.User", "User")
                        .WithMany("UserWorkouts")
                        .HasForeignKey("UserID");

                    b.HasOne("dotnet.Models.Workout", "Workout")
                        .WithMany("UserWorkouts")
                        .HasForeignKey("WorkoutID");

                    b.Navigation("User");

                    b.Navigation("Workout");
                });

            modelBuilder.Entity("dotnet.Models.User", b =>
                {
                    b.Navigation("UserWorkouts");
                });

            modelBuilder.Entity("dotnet.Models.Workout", b =>
                {
                    b.Navigation("UserWorkouts");
                });
#pragma warning restore 612, 618
        }
    }
}
