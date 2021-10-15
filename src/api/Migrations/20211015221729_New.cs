using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Api.Migrations
{
    public partial class New : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData("Events", new string[] { "ID", "Date", "Location", "Description" }, new object[]{
                "1", new DateTime(2022,4,1), "Up North", "The Great Walkathon"
            });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
