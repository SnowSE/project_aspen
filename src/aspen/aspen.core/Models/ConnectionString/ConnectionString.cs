using System;

namespace Aspen.Core.Models
{
    public class ConnectionString
    {
        public Port Port { get; }
        public Server Server { get; }
        public Database Database { get; }
        public UserId UserId { get; }
        public Password Password { get; }

        public ConnectionString(string data)
        {
            Port = new Port(data);
            Server = new Server(data);
            Database = new Database(data);
            UserId = new UserId(data);
            Password = new Password(data);
        }

        public ConnectionString(Server server, Port port, Database database, UserId userId, Password password)
        {
            Server = server;
            Port = port;
            Database = database;
            UserId = userId;
            Password = password;
        }

        public override string ToString() =>
            Server.ToString() + 
            Port.ToString() + 
            Database.ToString() + 
            UserId.ToString() + 
            Password.ToString();

        internal ConnectionString UpdateUser(string dbUser)
        {
            return new ConnectionString(Server, Port, Database, new UserId(dbUser), Password);
        }
    }
}