using System;
using System.Runtime.Serialization;

namespace Api.Exceptions
{
    [Serializable]
    internal class PageDataNotFoundException : Exception
    {
        public PageDataNotFoundException()
        {
        }

        public PageDataNotFoundException(string message) : base(message)
        {
        }

        public PageDataNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected PageDataNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}