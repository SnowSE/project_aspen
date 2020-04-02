namespace Aspen.Core.Models
{
    public class ConnectionString
    {
        public Port Port { get; }

        public ConnectionString(string data)
        {
            Port = new Port(data);
        }
    }
}