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

        public ConnectionString(string connection)
        {
            if (string.IsNullOrEmpty(connection))
                throw new ArgumentException("Empty connection string");
                
            Port = new Port(connection);
            Server = new Server(connection);
            Database = new Database(connection);
            UserId = new UserId(connection);
            Password = new Password(connection);
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
            "Passfile=/app/.postgresql/.pgpass;SSL Mode=Require;Trust Server Certificate=True;" +
            Server.ToString() + 
            Port.ToString() + 
            Database.ToString() + 
            UserId.ToString() + 
            Password.ToString();

        //should only be used for testing purposes
        public string ToInsecureString() =>
            Server.ToString() + 
            Port.ToString() + 
            Database.ToString() + 
            UserId.ToString() + 
            Password.ToString();

        public ConnectionString UpdateUser(string dbUser)
        {
            return new ConnectionString(Server, Port, Database, new UserId($"Username={dbUser};"), Password);
        }

        public ConnectionString UpdateDatabase(string dbName)
        {
            return new ConnectionString(Server, Port, new Database($"Database={dbName};"), UserId, Password);
        }

        public ConnectionString UpdatePassword(string password)
        {
            return new ConnectionString(Server, Port, Database, UserId, new Password($"Password={password};"));
        }

        public ConnectionString UpdateServer(Server server)
        {
            return new ConnectionString(server, Port, Database, UserId, Password);
        }

        public ConnectionString UpdatePort(Port port)
        {
            return new ConnectionString(Server, port, Database, UserId, Password);
        }
    }
}