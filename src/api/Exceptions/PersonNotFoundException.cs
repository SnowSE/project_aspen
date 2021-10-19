namespace Api.Exceptions
{
    public class PersonNotFoundException : System.Exception
    {
        public PersonNotFoundException() { }
        public PersonNotFoundException(string message) : base(message) { }
        public PersonNotFoundException(string message, System.Exception inner) : base(message, inner) { }
        protected PersonNotFoundException(
            System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}