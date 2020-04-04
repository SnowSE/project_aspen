using System;
using System.Text.RegularExpressions;

namespace Aspen.Core.Models
{
    public class Database
    {
        public string data;

        public Database(string connectionString)
        {
            data = getAndValidateUser(connectionString);
        }

        private static string getAndValidateUser(string connectionString)
        {
            var DatabasePattern = @"Database=([a-zA-Z_]+[a-zA-Z0-9_]*);";
            var match = Regex.Match(connectionString, DatabasePattern);
            if(match.Success)
                return match.Groups[1].Value;
            else
                throw new ArgumentException("Invalid database");
        }

        public override string ToString() => "Database=" + data.ToString() + "; ";
    }
}