﻿// <auto-generated />
using System;
using System.Text.Json;
using v2.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace v2.Migrations
{
    [DbContext(typeof(AspenContext))]
    [Migration("20211021045038_recordDbModels")]
    partial class recordDbModels
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("Api.DbModels.DbEvent", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Location")
                        .HasColumnType("text");

                    b.Property<string>("PrimaryImageUrl")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("Api.DbModels.DbPageData", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<JsonDocument>("Data")
                        .HasColumnType("jsonb");

                    b.Property<string>("Key")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("PageData");
                });

            modelBuilder.Entity("Api.DbModels.DbPerson", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("AuthID")
                        .HasColumnType("text");

                    b.Property<string>("Bio")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("Api.DbModels.DbPersonRegistration", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<long>("PersonID")
                        .HasColumnType("bigint");

                    b.Property<long>("RegistrationID")
                        .HasColumnType("bigint");

                    b.HasKey("ID");

                    b.HasIndex("PersonID");

                    b.HasIndex("RegistrationID");

                    b.ToTable("PersonRegistrations");
                });

            modelBuilder.Entity("Api.DbModels.DbRegistration", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("IsPublic")
                        .HasColumnType("boolean");

                    b.Property<string>("Nickname")
                        .HasColumnType("text");

                    b.Property<long>("OwnerID")
                        .HasColumnType("bigint");

                    b.Property<long>("TeamID")
                        .HasColumnType("bigint");

                    b.HasKey("ID");

                    b.HasIndex("OwnerID");

                    b.HasIndex("TeamID");

                    b.ToTable("Registrations");
                });

            modelBuilder.Entity("Api.DbModels.DbTeam", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<long>("EventID")
                        .HasColumnType("bigint");

                    b.Property<string>("MainImage")
                        .HasColumnType("text");

                    b.Property<long>("OwnerID")
                        .HasColumnType("bigint");

                    b.HasKey("ID");

                    b.HasIndex("EventID");

                    b.HasIndex("OwnerID");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Api.DbModels.DbPersonRegistration", b =>
                {
                    b.HasOne("Api.DbModels.DbPerson", "Person")
                        .WithMany("PersonRegistrations")
                        .HasForeignKey("PersonID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.DbModels.DbRegistration", "Registration")
                        .WithMany("PersonRegistrations")
                        .HasForeignKey("RegistrationID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Person");

                    b.Navigation("Registration");
                });

            modelBuilder.Entity("Api.DbModels.DbRegistration", b =>
                {
                    b.HasOne("Api.DbModels.DbPerson", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.DbModels.DbTeam", "Team")
                        .WithMany("Registrations")
                        .HasForeignKey("TeamID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Api.DbModels.DbTeam", b =>
                {
                    b.HasOne("Api.DbModels.DbEvent", "Event")
                        .WithMany("Teams")
                        .HasForeignKey("EventID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.DbModels.DbPerson", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("Api.DbModels.DbEvent", b =>
                {
                    b.Navigation("Teams");
                });

            modelBuilder.Entity("Api.DbModels.DbPerson", b =>
                {
                    b.Navigation("PersonRegistrations");
                });

            modelBuilder.Entity("Api.DbModels.DbRegistration", b =>
                {
                    b.Navigation("PersonRegistrations");
                });

            modelBuilder.Entity("Api.DbModels.DbTeam", b =>
                {
                    b.Navigation("Registrations");
                });
#pragma warning restore 612, 618
        }
    }
}
