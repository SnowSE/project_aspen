﻿// <auto-generated />
using System;
using Api.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Api.Migrations
{
    [DbContext(typeof(AspenContext))]
    [Migration("20230215194255_RemovedOageData")]
    partial class RemovedOageData
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Api.DbModels.DbDonation", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ID"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("numeric");

                    b.Property<string>("AuthorizationNumber")
                        .HasColumnType("text");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<long>("EventID")
                        .HasColumnType("bigint");

                    b.Property<bool>("IsPledge")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<string>("LinkGuid")
                        .HasColumnType("text");

                    b.Property<long?>("PersonID")
                        .HasColumnType("bigint");

                    b.Property<long?>("TeamID")
                        .HasColumnType("bigint");

                    b.Property<Guid>("TransactionNumber")
                        .HasColumnType("uuid");

                    b.HasKey("ID");

                    b.HasIndex("EventID");

                    b.HasIndex("PersonID");

                    b.HasIndex("TeamID");

                    b.ToTable("Donations");
                });

            modelBuilder.Entity("Api.DbModels.DbEvent", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ID"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("DonationTarget")
                        .HasColumnType("numeric");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("MainImage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("Api.DbModels.DbLink", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ID"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<long>("EventID")
                        .HasColumnType("bigint");

                    b.Property<string>("LinkIdentifer")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LinkURL")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("PersonID")
                        .HasColumnType("bigint");

                    b.HasKey("ID");

                    b.HasIndex("EventID");

                    b.HasIndex("PersonID");

                    b.ToTable("Links");
                });

            modelBuilder.Entity("Api.DbModels.DbLinkRecord", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ID"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<long>("LinkID")
                        .HasColumnType("bigint");

                    b.Property<long?>("PersonID")
                        .HasColumnType("bigint");

                    b.HasKey("ID");

                    b.HasIndex("LinkID");

                    b.ToTable("LinkRecords");
                });

            modelBuilder.Entity("Api.DbModels.DbPerson", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ID"));

                    b.Property<string>("AuthID")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Bio")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("Api.DbModels.DbPersonRegistration", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ID"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

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
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ID"));

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

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
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ID"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("DonationTarget")
                        .HasColumnType("numeric");

                    b.Property<long>("EventID")
                        .HasColumnType("bigint");

                    b.Property<bool>("IsPublic")
                        .HasColumnType("boolean");

                    b.Property<string>("MainImage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)");

                    b.Property<long>("OwnerID")
                        .HasColumnType("bigint");

                    b.HasKey("ID");

                    b.HasIndex("EventID");

                    b.HasIndex("OwnerID");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("combined.Models.DbModels.DbPaymentFailure", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ID"));

                    b.Property<long>("Amount")
                        .HasColumnType("bigint");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Decline_Code")
                        .HasColumnType("text");

                    b.Property<long>("EventID")
                        .HasColumnType("bigint");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long?>("PersonID")
                        .HasColumnType("bigint");

                    b.HasKey("ID");

                    b.HasIndex("EventID");

                    b.HasIndex("PersonID");

                    b.ToTable("PaymentFailures");
                });

            modelBuilder.Entity("Api.DbModels.DbDonation", b =>
                {
                    b.HasOne("Api.DbModels.DbEvent", "Event")
                        .WithMany()
                        .HasForeignKey("EventID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.DbModels.DbPerson", "Person")
                        .WithMany()
                        .HasForeignKey("PersonID");

                    b.HasOne("Api.DbModels.DbTeam", "Team")
                        .WithMany("Donations")
                        .HasForeignKey("TeamID");

                    b.Navigation("Event");

                    b.Navigation("Person");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Api.DbModels.DbLink", b =>
                {
                    b.HasOne("Api.DbModels.DbEvent", "Event")
                        .WithMany()
                        .HasForeignKey("EventID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.DbModels.DbPerson", "Person")
                        .WithMany()
                        .HasForeignKey("PersonID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("Person");
                });

            modelBuilder.Entity("Api.DbModels.DbLinkRecord", b =>
                {
                    b.HasOne("Api.DbModels.DbLink", "Link")
                        .WithMany()
                        .HasForeignKey("LinkID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Link");
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

            modelBuilder.Entity("combined.Models.DbModels.DbPaymentFailure", b =>
                {
                    b.HasOne("Api.DbModels.DbEvent", "Event")
                        .WithMany()
                        .HasForeignKey("EventID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.DbModels.DbPerson", "Person")
                        .WithMany()
                        .HasForeignKey("PersonID");

                    b.Navigation("Event");

                    b.Navigation("Person");
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
                    b.Navigation("Donations");

                    b.Navigation("Registrations");
                });
#pragma warning restore 612, 618
        }
    }
}
