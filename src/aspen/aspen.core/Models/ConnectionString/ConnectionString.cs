using System;

namespace Aspen.Core.Models
{
    public class ConnectionString
    {
        public Port Port { get; }
        public Host Server { get; }
        public Database Database { get; }
        public UserId UserId { get; }
        public Password Password { get; }
        public string Ssl { get; }

        public ConnectionString(string connection)
        {
            if (string.IsNullOrEmpty(connection))
                throw new ArgumentException("Empty connection string");
            Ssl = connection.Contains("Passfile")
                ? "Passfile=/app/.postgresql/.pgpass;SSL Mode=Require;Trust Server Certificate=True;"
                : "";
                
            Port = new Port(connection);
            Server = new Host(connection);
            Database = new Database(connection);
            UserId = new UserId(connection);
            Password = connection.Contains("Passfile")
                ? new Password("Password=;")
                : new Password(connection);
        }

        public ConnectionString(Host server, Port port, Database database, UserId userId, Password password, String ssl)
        {
            Server = server;
            Port = port;
            Database = database;
            UserId = userId;
            Password = password;
            Ssl = ssl;
        }

        public override string ToString() =>
            Ssl +
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
            return new ConnectionString(Server, Port, Database, new UserId($"Username={dbUser};"), Password, Ssl);
        }

        public ConnectionString UpdateDatabase(string dbName)
        {
            return new ConnectionString(Server, Port, new Database($"Database={dbName};"), UserId, Password, Ssl);
        }

        public ConnectionString UpdatePassword(string password)
        {
            return new ConnectionString(Server, Port, Database, UserId, new Password($"Password={password};"), Ssl);
        }

        public ConnectionString UpdateServer(Host server)
        {
            return new ConnectionString(server, Port, Database, UserId, Password, Ssl);
        }

        public ConnectionString UpdatePort(Port port)
        {
            return new ConnectionString(Server, port, Database, UserId, Password, Ssl);
        }
    }
}