using combined.Models.DbModels;
using combined.Models.Entities;

namespace v2.Mappers;

public class AspenMapperProfile : Profile
{
    /// <summary>
    /// Rules to go to and from different object types
    /// </summary>
    /// <seealso cref="https://codewithmukesh.com/blog/automapper-in-aspnet-core/"/>
    public AspenMapperProfile()
    {
        //CreateMap<DbEvent, Event>()
        //    .ReverseMap();

        //CreateMap<Event, DtoEvent>()
        //    .ReverseMap();

        CreateMap<DbPerson, DtoPerson>()
            .ReverseMap();

        CreateMap<DtoPerson, DtoPerson>()
            .ReverseMap();

        CreateMap<DbTeam, DtoTeam>()
            .ReverseMap();

        CreateMap<DtoDonation, DbDonation>()
            .ReverseMap();

        CreateMap<DtoEvent, DbEvent>()
            .ReverseMap();
        //CreateMap<DtoTeam, Team>()
        //    .ReverseMap();

        //CreateMap<DbTeam, Team>()
        //    .ReverseMap();

        //CreateMap<DbEvent, Event>()
        //    .ReverseMap();

        //CreateMap<DtoEvent, Event>()
        //    .ReverseMap();

        //CreateMap<DbDonation, Donation>()
        //    .ReverseMap();

        //CreateMap<DtoDonation, Donation>();

        //CreateMap<Donation, DtoDonation>()
        //    .ForMember(dest => dest.TeamName, opt => opt.MapFrom(src => src.Team.Name))
        //    .ForMember(dest => dest.PersonName, opt => opt.MapFrom(src => src.Person.Name));

        CreateMap<DbLink, DtoLink>()
            .ReverseMap();

        CreateMap<DbLinkRecord, DtoLinkRecord>()
            .ReverseMap();

        CreateMap<DbPaymentFailure, DtoPaymentFailure>()
            .ReverseMap();

        CreateMap<DbPersonTeamAssociation, DtoPersonTeamAssociation>()
            .ReverseMap();
    }
}
