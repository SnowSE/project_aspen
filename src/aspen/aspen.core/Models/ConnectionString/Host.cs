using System;
using System.Text.RegularExpressions;

namespace Aspen.Core.Models
{
    public class Host
    {
        public string data { get; }
        public Host(string connectionString)
        {
            data = getAndValidateServer(connectionString);
        }


        private static string getAndValidateServer(string connectionString)
        {
            var serverPattern = @"Host=([a-z0-9-.]+);";
            var match = Regex.Match(connectionString, serverPattern);
            if(match.Success)
                return match.Groups[1].Value;
            else
                throw new ArgumentException("Invalid Host");
        }

        public override string ToString() => "Host=" + data.ToString() + ";";
    }
}