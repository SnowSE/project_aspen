namespace Aspen.Core.Models
{
    public class ConnectionString
    {
        public Port Port { get; }
        public Server Server { get; }
        public Database Database { get; }
        public UserId User { get; }
        public Password Password { get; }

        public ConnectionString(string data)
        {
            Port = new Port(data);
            Server = new Server(data);
            Database = new Database(data);
            User = new UserId(data);
            Password = new Password(data);
        }

        public override string ToString() =>
            Server.ToString() + 
            Port.ToString() + 
            Database.ToString() + 
            User.ToString() + 
            Password.ToString();
    }
}