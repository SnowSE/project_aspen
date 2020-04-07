using System;
using System.Text.RegularExpressions;

namespace Aspen.Core.Models
{
    public class Port
    {
        private int data;

        public Port(string connectionString)
        {
            data = getAndValidatePort(connectionString);

        }

        private static int getAndValidatePort(string connectionString)
        {
            var portPattern = @"Port=([0-9]+);";
            var match = Regex.Match(connectionString, portPattern);
            var portString = match.Groups[1].Value;
            var port = int.Parse(portString);
            if(port > 0 && port < 65000)
                return port;
            else
                throw new ArgumentException("Invalid port");
        }

        public override string ToString() => "Port=" + data.ToString() + ";";
    }
}