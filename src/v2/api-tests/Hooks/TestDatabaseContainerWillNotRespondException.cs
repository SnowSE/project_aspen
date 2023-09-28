using System.Runtime.Serialization;

namespace Tests.Hooks
{
    [Serializable]
    internal class TestDatabaseContainerWillNotRespondException : Exception
    {
        public TestDatabaseContainerWillNotRespondException()
        {
        }

        public TestDatabaseContainerWillNotRespondException(string message) : base(message)
        {
        }

        public TestDatabaseContainerWillNotRespondException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected TestDatabaseContainerWillNotRespondException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}