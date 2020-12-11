using System;
using FluentMigrator;

namespace aspen.core.Data
{
    [Migration(003)]
    public class Migration003 : Migration
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
                    .AddColumn("bannerUrl").AsString().NotNullable()
                    .AddColumn("logoUrl").AsString().NotNullable();

                Execute.Sql("update theme set bannerUrl = ' ' where bannerUrl is null");
                Execute.Sql("update theme set logoUrl = ' ' where logoUrl is null");

            }

        }

        public override void Down()
        {
            if (ConnectionString.Contains("Database=admin;"))
            {

            }
            else
            {
                Delete.Column("bannerUrl").FromTable("theme");
                Delete.Column("logoUrl").FromTable("theme");
            }
            
        }
    }
}

