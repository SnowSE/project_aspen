using System;
using System.Text.RegularExpressions;

namespace Aspen.Core.Models
{
    public class UserId
    {
        private string data;

        public UserId(string connectionString)
        {
            data = getAndValidateUser(connectionString);
        }

        private static string getAndValidateUser(string connectionString)
        {
            var UserIdPattern = @"User Id=([a-zA-Z_]+[a-zA-Z0-9_]*);";
            var match = Regex.Match(connectionString, UserIdPattern);
            if(match.Success)
                return match.Groups[1].Value;
            else
                throw new ArgumentException("Invalid user id");
        }

        public override string ToString() => "User Id=" + data.ToString() + "; ";
    }
}