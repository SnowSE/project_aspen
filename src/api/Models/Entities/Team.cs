using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Entities
{
    public class Team
    {
        public long ID { get; init; }
        public string Name { get; init; }
        public string Description { get; init; }
        public string MainImage { get; init; }
        public long OwnerID { get; init; }
        public Person Owner { get; init; }
        public long EventID { get; init; }
        public Event Event { get; init; }
        public decimal DonationTarget { get; init; }
    }

    public static class TeamExtensions
    {
        public static Team WithEventId(this Team currentTeam, long newEventId)
        {
            return new Team
            {
                ID = currentTeam.ID,
                Name = currentTeam.Name,
                Description = currentTeam.Description,
                MainImage = currentTeam.MainImage,
                OwnerID = currentTeam.OwnerID,
                Owner = currentTeam.Owner,
                EventID = newEventId,
                Event = currentTeam.Event,
                DonationTarget = currentTeam.DonationTarget
            };
        }

        public static Team WithDonationTarget(this Team currentTeam, decimal donationTarget)
        {
            return new Team
            {
                ID = currentTeam.ID,
                Name = currentTeam.Name,
                Description = currentTeam.Description,
                MainImage = currentTeam.MainImage,
                OwnerID = currentTeam.OwnerID,
                Owner = currentTeam.Owner,
                EventID = currentTeam.ID,
                Event = currentTeam.Event,
                DonationTarget = donationTarget
            };
        }
    }
}