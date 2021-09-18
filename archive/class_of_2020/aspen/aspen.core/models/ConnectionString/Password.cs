using System;
using System.Text.RegularExpressions;

namespace Aspen.Core.Models
{
    public class Password
    {
        private string data;

        public Password(string connectionString)
        {
            data = getPassword(connectionString);
        }

        private static string getPassword(string connectionString)
        {
            var UserIdPattern = @"Password=([\S]*);";
            var match = Regex.Match(connectionString, UserIdPattern);
            if(match.Success)
                return match.Groups[1].Value;
            else
                throw new ArgumentException("Invalid password");
        }

        public override string ToString() => "Password=" + data.ToString() + ";";
    }
}