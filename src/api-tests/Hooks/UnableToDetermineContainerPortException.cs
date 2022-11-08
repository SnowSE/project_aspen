using System.Runtime.Serialization;

namespace Tests.Hooks
{
    [Serializable]
    internal class UnableToDetermineContainerPortException : Exception
    {
        public UnableToDetermineContainerPortException()
        {
        }

        public UnableToDetermineContainerPortException(string message) : base(message)
        {
        }

        public UnableToDetermineContainerPortException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected UnableToDetermineContainerPortException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}