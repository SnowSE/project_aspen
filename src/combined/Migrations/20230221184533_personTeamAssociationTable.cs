using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class personTeamAssociationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PersonAndTeamAssociations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PersonId = table.Column<long>(type: "bigint", nullable: false),
                    TeamId = table.Column<long>(type: "bigint", nullable: false),
                    EventId = table.Column<long>(type: "bigint", nullable: false),
                    DateJoined = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonAndTeamAssociations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PersonAndTeamAssociations_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonAndTeamAssociations_Persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Persons",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonAndTeamAssociations_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonAndTeamAssociations_EventId",
                table: "PersonAndTeamAssociations",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonAndTeamAssociations_PersonId_EventId",
                table: "PersonAndTeamAssociations",
                columns: new[] { "PersonId", "EventId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PersonAndTeamAssociations_TeamId",
                table: "PersonAndTeamAssociations",
                column: "TeamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PersonAndTeamAssociations");
        }
    }
}
