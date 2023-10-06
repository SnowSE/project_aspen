using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace shared.DtoModels;

public record DtoTeam
{
    [SwaggerSchema(ReadOnly = true)]
    public long ID { get; set; }
    [Required]
    public string Name { get; set; }
    public string Description { get; set; }
    public string MainImage { get; set; }
    public string WelcomeMessage { get; set; }
    public long OwnerID { get; set; }
    public long EventID { get; set; }
    public decimal DonationTarget { get; set; }
    public bool IsArchived { get; set; } = false;
}

public static class TeamExtensions
{
    public static DtoTeam WithEventId(this DtoTeam currentTeam, long newEventId)
    {
        return new DtoTeam
        {
            ID = currentTeam.ID,
            Name = currentTeam.Name,
            Description = currentTeam.Description,
            MainImage = currentTeam.MainImage,
            OwnerID = currentTeam.OwnerID,
            EventID = newEventId,
            DonationTarget = currentTeam.DonationTarget,
            IsArchived = currentTeam.IsArchived,
            WelcomeMessage = currentTeam.WelcomeMessage
        };
    }
}

