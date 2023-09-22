using Microsoft.EntityFrameworkCore.Migrations;

namespace v2.Migrations
{
    public partial class RenamePendingColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Pending",
                table: "Donations",
                newName: "IsPending");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsPending",
                table: "Donations",
                newName: "Pending");
        }
    }
}
