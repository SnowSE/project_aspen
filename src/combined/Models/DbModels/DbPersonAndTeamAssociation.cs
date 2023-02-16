namespace combined.Models.DbModels
{
    public class DbPersonAndTeamAssociation
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public DbPerson Person { get; set; }
        public int TeamId { get; set; }
        public DbTeam Team { get; set; }
        public int EventId { get; set; }
        public DbEvent Event { get; set; }
        public DateTime DateJoined { get; set; }
    }
}