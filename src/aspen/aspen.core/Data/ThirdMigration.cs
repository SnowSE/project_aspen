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

            Alter.Table("theme")
            .AddColumn("bannerUrl").AsString().NotNullable()
            .AddColumn("logoUrl").AsString().NotNullable();

        }

        public override void Down()
        {
            Delete.Column("bannerUrl").FromTable("theme");
            Delete.Column("logoUrl").FromTable("theme");
        }
    }
}

