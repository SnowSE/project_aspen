namespace Api.Exceptions;

public class UnableToDeleteException<T> : Exception where T : class
{
    public UnableToDeleteException() { }
    public UnableToDeleteException(string message) : base(message) { }
    public UnableToDeleteException(string message, Exception inner) : base(message, inner) { }
    protected UnableToDeleteException(
        System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
}

