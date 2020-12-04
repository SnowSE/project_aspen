using System;
using FluentMigrator;

namespace aspen.core.Data
{
    [Migration(003)]
    public class ThirdMigration : Migration
    {
        //tables and columns need to be lowercase to work with Dapper
        public override void Up()
        {
            if (ConnectionString.Contains("Database=admin;"))
            {

            }
            else
            {
                 Alter.Table("theme")
                 .AddColumn("bannerurl").AsString().NotNullable()
                 .AddColumn("logourl").AsString().NotNullable();
            }

            

        }

        public override void Down()
        {
            if (ConnectionString.Contains("Database=admin;"))
            {

            }
            else
            {
                Delete.Column("bannerurl").FromTable("theme");
                Delete.Column("logourl").FromTable("theme");
            }
            
        }
    }
}

