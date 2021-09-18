using System;

namespace Aspen.Core.Models
{
    public class ConnectionString
    {
        public Port Port { get; }
        public Host Host { get; }
        public Database Database { get; }
        public Username UserId { get; }
        public Password Password { get; }

        public ConnectionString(string connection)
        {
            if (string.IsNullOrEmpty(connection))
                throw new ArgumentException("Empty connection string");
                
            Port = new Port(connection);
            Host = new Host(connection);
            Database = new Database(connection);
            UserId = new Username(connection);
            Password = connection.Contains("Password")
                ? new Password(connection)
                : new Password("Password=;");
            // Password = new Password(connection);
        }

        public ConnectionString(Host server, Port port, Database database, Username userId, Password password)
        {
            Host = server;
            Port = port;
            Database = database;
            UserId = userId;
            Password = password;
        }

        public override string ToString() =>
            $"SSL Mode=Require; Trust Server Certificate=True;{Host}{Port}{Database}{UserId}{Password}";

        //should only be used for testing purposes
        public string ToInsecureString() => $"{Host}{Port}{Database}{UserId}{Password}";

        public ConnectionString UpdateUser(string dbUser)
        {
            return new ConnectionString(Host, Port, Database, new Username($"Username={dbUser};"), Password);
        }

        public ConnectionString UpdateDatabase(string dbName)
        {
            return new ConnectionString(Host, Port, new Database($"Database={dbName};"), UserId, Password);
        }

        public ConnectionString UpdatePassword(string password)
        {
            return new ConnectionString(Host, Port, Database, UserId, new Password($"Password={password};"));
        }

        public ConnectionString UpdateServer(Host server)
        {
            return new ConnectionString(server, Port, Database, UserId, Password);
        }

        public ConnectionString UpdatePort(Port port)
        {
            return new ConnectionString(Host, port, Database, UserId, Password);
        }
    }
}