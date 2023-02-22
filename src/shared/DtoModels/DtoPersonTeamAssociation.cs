using Swashbuckle.AspNetCore.Annotations;

namespace shared.DtoModels;

public record DtoPersonTeamAssociation
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; set; }

    public long PersonId { get; set; }

    public long TeamId { get; set; }

    public long EventId { get; set; }

    public DateTime DateJoined { get; set; }

}

