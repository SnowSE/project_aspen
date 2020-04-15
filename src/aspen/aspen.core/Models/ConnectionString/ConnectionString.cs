using System;

namespace Aspen.Core.Models
{
    public class ConnectionString
    {
        public Port Port { get; }
        public Host Host { get; }
        public Database Database { get; }
        public UserId UserId { get; }
        public Password Password { get; }
        public string Ssl { get; }

        public ConnectionString(string connection)
        {
            if (string.IsNullOrEmpty(connection))
                throw new ArgumentException("Empty connection string");
            Ssl = connection.Contains("Passfile")
                ? "SSL Mode=Require; Trust Server Certificate=True; "
                : "";
                
            Port = new Port(connection);
            Host = new Host(connection);
            Database = new Database(connection);
            UserId = new UserId(connection);
            Password = connection.Contains("Password")
                ? new Password(connection)
                : new Password("Password=;");
            // Password = new Password(connection);
        }

        public ConnectionString(Host server, Port port, Database database, UserId userId, Password password, String ssl)
        {
            Host = server;
            Port = port;
            Database = database;
            UserId = userId;
            Password = password;
            Ssl = ssl;
        }

        public override string ToString() =>
            "SSL Mode=Require; Trust Server Certificate=True;" +
            Host.ToString() + 
            Port.ToString() + 
            Database.ToString() + 
            UserId.ToString() ;

        //should only be used for testing purposes
        public string ToInsecureString() =>
            Host.ToString() + 
            Port.ToString() + 
            Database.ToString() + 
            UserId.ToString() + 
            Password.ToString();

        public ConnectionString UpdateUser(string dbUser)
        {
            return new ConnectionString(Host, Port, Database, new UserId($"Username={dbUser};"), Password, Ssl);
        }

        public ConnectionString UpdateDatabase(string dbName)
        {
            return new ConnectionString(Host, Port, new Database($"Database={dbName};"), UserId, Password, Ssl);
        }

        public ConnectionString UpdatePassword(string password)
        {
            return new ConnectionString(Host, Port, Database, UserId, new Password($"Password={password};"), Ssl);
        }

        public ConnectionString UpdateServer(Host server)
        {
            return new ConnectionString(server, Port, Database, UserId, Password, Ssl);
        }

        public ConnectionString UpdatePort(Port port)
        {
            return new ConnectionString(Host, port, Database, UserId, Password, Ssl);
        }
    }
}