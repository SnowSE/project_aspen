using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDonationModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AuthorizationNumber",
                table: "Donations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TransactionNumber",
                table: "Donations",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorizationNumber",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "TransactionNumber",
                table: "Donations");
        }
    }
}
