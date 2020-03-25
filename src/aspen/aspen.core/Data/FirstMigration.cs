using FluentMigrator;

namespace Aspen.Core.Data
{
    [Migration(001)]
    public class FirstMigration : Migration
    {
        public override void Up()
        {
            Create.Table("charity")
                .WithColumn("charityid").AsGuid().NotNullable().PrimaryKey()
                .WithColumn("charityname").AsString().NotNullable().Unique()
                .WithColumn("charitydescription").AsString().NotNullable();

            Create.Table("domain")
                .WithColumn("charityid").AsGuid().ForeignKey("charity", "charityid").NotNullable()
                .WithColumn("charitydomain").AsString().NotNullable().Unique();

            Create.Table("theme")
                .WithColumn("charityid").AsGuid().ForeignKey("charity", "charityid").NotNullable()
                .WithColumn("primarymaincolor").AsString().NotNullable()
                .WithColumn("primarylightcolor").AsString().NotNullable()
                .WithColumn("primarycontrastcolor").AsString().NotNullable()
                .WithColumn("secondarymaincolor").AsString().NotNullable()
                .WithColumn("fontfamily").AsString().NotNullable();
        }

        public override void Down()
        {
            Delete.Table("charityid");
            Delete.Table("charitydomain");
        }
    }
}