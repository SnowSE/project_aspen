using System.Runtime.Serialization;

namespace Tests.Hooks
{
    [Serializable]
    internal class UnableToCreateTestDatabaseContainerException : Exception
    {
        public UnableToCreateTestDatabaseContainerException()
        {
        }

        public UnableToCreateTestDatabaseContainerException(string message) : base(message)
        {
        }

        public UnableToCreateTestDatabaseContainerException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected UnableToCreateTestDatabaseContainerException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}