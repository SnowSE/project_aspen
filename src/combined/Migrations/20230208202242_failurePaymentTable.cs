using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace v2.Migrations
{
    /// <inheritdoc />
    public partial class failurePaymentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PaymentFailures",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EventID = table.Column<long>(type: "bigint", nullable: false),
                    PersonID = table.Column<long>(type: "bigint", nullable: true),
                    Amount = table.Column<long>(type: "bigint", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    DeclineCode = table.Column<string>(name: "Decline_Code", type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentFailures", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PaymentFailures_Events_EventID",
                        column: x => x.EventID,
                        principalTable: "Events",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PaymentFailures_Persons_PersonID",
                        column: x => x.PersonID,
                        principalTable: "Persons",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PaymentFailures_EventID",
                table: "PaymentFailures",
                column: "EventID");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentFailures_PersonID",
                table: "PaymentFailures",
                column: "PersonID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentFailures");
        }
    }
}
