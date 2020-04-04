using System;
using System.Text.RegularExpressions;

namespace Aspen.Core.Models
{
    public class Server
    {
        private string data { get; }
        public Server(string connectionString)
        {
            data = getAndValidateServer(connectionString);
        }


        private static string getAndValidateServer(string connectionString)
        {
            var serverPattern = @"Server=([a-z0-9-.]+);";
            var match = Regex.Match(connectionString, serverPattern);
            if(match.Success)
                return match.Groups[1].Value;
            else
                throw new ArgumentException("Invalid server");
        }

        public override string ToString() => "Server=" + data.ToString() + "; ";
    }
}