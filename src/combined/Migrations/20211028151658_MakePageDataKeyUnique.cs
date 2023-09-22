using Microsoft.EntityFrameworkCore.Migrations;

namespace v2.Migrations
{
    public partial class MakePageDataKeyUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("delete from \"PageData\"");

            migrationBuilder.CreateIndex(
                name: "IX_PageData_Key",
                table: "PageData",
                column: "Key",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PageData_Key",
                table: "PageData");
        }
    }
}
