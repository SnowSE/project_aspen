using System;
using FluentMigrator;

namespace aspen.core.Data
{
    [Migration(002)]
    public class SecondMigration : Migration
    {
        //tables and columns need to be lowercase to work with Dapper
        public override void Up()
        {

            if (ConnectionString.Contains("Database=admin;"))
            {

            }
            else
            {
                Create.Table("charityuser")
                    .WithColumn("id").AsGuid().PrimaryKey().NotNullable()
                    .WithColumn("firstname").AsString().NotNullable()
                    .WithColumn("lastname").AsString().NotNullable()
                    .WithColumn("username").AsString().NotNullable().Unique()
                    .WithColumn("salt").AsBinary().NotNullable()
                    .WithColumn("hashedpassword").AsString().NotNullable()
                    .WithColumn("role").AsString().NotNullable();
            }

        }

        public override void Down()
        {
            Delete.Table("charityuser");
        }
    }
}
