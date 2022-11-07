using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class IsPledge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPending",
                table: "Donations");

            migrationBuilder.AddColumn<bool>(
                name: "IsPledge",
                table: "Donations",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPledge",
                table: "Donations");

            migrationBuilder.AddColumn<bool>(
                name: "IsPending",
                table: "Donations",
                type: "boolean",
                nullable: false,
                defaultValue: true);
        }
    }
}
