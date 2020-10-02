using FluentMigrator;

namespace Aspen.Core.Data
{
    [Migration(001)]
    public class FirstMigration : Migration
    {
        //tables and columns need to be lowercase to work with Dapper
        public override void Up()
        {
            // split migrations into its own microservice, with account to edit database tables
            // run api with insert/read access not alter table access
            if (ConnectionString.Contains("Database=admin;"))
            {

                Execute.Sql("REVOKE All ON DATABASE admin FROM PUBLIC;");
                Execute.Sql("REVOKE All ON schema public FROM PUBLIC;");
                Create.Table("charity")
                    .WithColumn("charityid").AsGuid().NotNullable().PrimaryKey()
                    .WithColumn("charityname").AsString().NotNullable().Unique()
                    .WithColumn("charitydescription").AsString().NotNullable()
                    .WithColumn("connectionstring").AsString().NotNullable();

                Create.Table("domain")
                    .WithColumn("charityid").AsGuid().ForeignKey("charity", "charityid").NotNullable()
                    .WithColumn("charitydomain").AsString().NotNullable().Unique();

                Create.Table("adminuser")
                    .WithColumn("id").AsGuid().PrimaryKey().NotNullable()
                    .WithColumn("firstname").AsString().NotNullable()
                    .WithColumn("lastname").AsString().NotNullable()
                    .WithColumn("username").AsString().NotNullable().Unique()
                    .WithColumn("salt").AsBinary().NotNullable()
                    .WithColumn("hashedpassword").AsString().NotNullable();
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
                    .WithColumn("active").AsBoolean().PrimaryKey().WithDefaultValue(true)
                    .WithColumn("primarymaincolor").AsString().NotNullable()
                    .WithColumn("primarylightcolor").AsString().NotNullable()
                    .WithColumn("primarycontrastcolor").AsString().NotNullable()
                    .WithColumn("secondarymaincolor").AsString().NotNullable()
                    .WithColumn("fontfamily").AsString().NotNullable();
                Execute.Sql(@"ALTER TABLE theme ADD CONSTRAINT single_row CHECK (active='TRUE');");
                Execute.Sql("comment on table theme is 'constraint on primary key limits to one row';");

                Create.Table("team")
                    .WithColumn("id").AsGuid().PrimaryKey()
                    .WithColumn("name").AsString().Unique().NotNullable()
                    .WithColumn("description").AsString();
            }

        }

        public override void Down()
        {
            //delete tables here
        }
    }
}