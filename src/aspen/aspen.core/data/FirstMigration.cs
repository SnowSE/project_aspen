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
                .WithColumn("domain").AsString().NotNullable().Unique();
        }

        public override void Down()
        {
            Delete.Table("charity");
            Delete.Table("charitydomain");
        }
    }
}