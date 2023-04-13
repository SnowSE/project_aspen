namespace Api.Models.Entities;
#nullable enable
public class Person
{
    public Person(long id, string name)
    {
        ID = id;
        Name = name;
    }
    public Person(long id, string name, string bio, string nickName)
    {
        ID = id;
        Name = name;
        Bio = bio;
        Nickname = nickName;
    }
    public long ID { get; init; }

    public string? AuthID { get; init; }

    public string Name { get; init; }

    public string? Bio { get; init; }
    public string Nickname { get; init; }
}

public static class PersonExtensions
{
    public static Person WithName(this Person currentPerson, string newName)
    {
        return new Person(currentPerson.ID, newName) { AuthID = currentPerson.AuthID, Bio = currentPerson.Bio };
    }

    public static Person WithBio(this Person currentPerson, string newBio)
    {
        return new Person(currentPerson.ID, currentPerson.Name) { AuthID = currentPerson.AuthID, Bio = newBio };
    }

    public static Person WithAuthId(this Person currentPerson, string newAuthID)
    {
        return new Person(currentPerson.ID, currentPerson.Name) { AuthID = newAuthID, Bio = currentPerson.Bio };
    }
}
