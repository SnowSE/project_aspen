using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class RemovedEventId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Donations_Events_EventID",
                table: "Donations");

            migrationBuilder.DropIndex(
                name: "IX_Donations_EventID",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "EventID",
                table: "Donations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "EventID",
                table: "Donations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Donations_EventID",
                table: "Donations",
                column: "EventID");

            migrationBuilder.AddForeignKey(
                name: "FK_Donations_Events_EventID",
                table: "Donations",
                column: "EventID",
                principalTable: "Events",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
