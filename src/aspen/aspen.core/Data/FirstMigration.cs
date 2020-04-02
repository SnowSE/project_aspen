using FluentMigrator;

namespace Aspen.Core.Data
{
    [Migration(001)]
    public class FirstMigration : Migration
    {
        //tables and columns need to be lowercase to work with Dapper
        public override void Up()
        {
            if (ConnectionString.Contains("Database=Admin;"))
            {
                Create.Table("charity")
                    .WithColumn("charityid").AsGuid().NotNullable().PrimaryKey()
                    .WithColumn("charityname").AsString().NotNullable().Unique()
                    .WithColumn("charitydescription").AsString().NotNullable()
                    .WithColumn("connectionstring").AsString().NotNullable();

                Create.Table("domain")
                    .WithColumn("charityid").AsGuid().ForeignKey("charity", "charityid").NotNullable()
                    .WithColumn("charitydomain").AsString().NotNullable().Unique();
            }
            else
            {
                // Create.Table("info")
                //     .WithColumn("single_row").AsBoolean().PrimaryKey().WithDefaultValue(true)
                //     // .WithColumn("charityname").AsString().NotNullable().Unique()
                //     .WithColumn("charitydescription").AsString().NotNullable();
                // Execute.Sql(@"ALTER TABLE info ADD CONSTRAINT single_row CHECK (single_row)");
                // // Insert.IntoTable("info").Row(new { charitydescription = "default description" });

                Create.Table("theme")
                    .WithColumn("single_row").AsBoolean().PrimaryKey().WithDefaultValue(true)
                    .WithColumn("primarymaincolor").AsString().NotNullable()
                    .WithColumn("primarylightcolor").AsString().NotNullable()
                    .WithColumn("primarycontrastcolor").AsString().NotNullable()
                    .WithColumn("secondarymaincolor").AsString().NotNullable()
                    .WithColumn("fontfamily").AsString().NotNullable();
                Execute.Sql(@"ALTER TABLE theme ADD CONSTRAINT single_row CHECK (single_row)");
            }



        }

        public override void Down()
        {
            Delete.Table("charityid");
            Delete.Table("charitydomain");
        }
    }
}