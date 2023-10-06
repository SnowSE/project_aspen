using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace v2.Migrations
{
    /// <inheritdoc />
    public partial class welcomeMessageInTeamTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WelcomeMessage",
                table: "Teams",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WelcomeMessage",
                table: "Teams");
        }
    }
}
