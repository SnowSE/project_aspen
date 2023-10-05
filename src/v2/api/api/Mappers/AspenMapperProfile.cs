using combined.Models.DbModels;
using combined.Models.Entities;

namespace Api.Mappers;

public class AspenMapperProfile : Profile
{
    /// <summary>
    /// Rules to go to and from different object types
    /// </summary>
    /// <seealso cref="https://codewithmukesh.com/blog/automapper-in-aspnet-core/"/>
    public AspenMapperProfile()
    {
        CreateMap<DbEvent, DtoEvent>()
            .ReverseMap();

        CreateMap<DbPerson, DtoPerson>()
            .ReverseMap();

        CreateMap<DtoPerson, DtoPerson>()
            .ReverseMap();

        CreateMap<DbTeam, DtoTeam>()
            .ReverseMap();

        CreateMap<DbEvent, DtoEvent>()
            .ReverseMap();

        CreateMap<DbDonation, DtoDonation>()
            .ReverseMap();

        CreateMap<DtoDonation, DtoDonation>();

        CreateMap<DbLink, DtoLink>()
            .ReverseMap();

        CreateMap<DbLink, DtoLink>()
            .ReverseMap();

        CreateMap<DbLinkRecord, DtoLinkRecord>()
            .ReverseMap();

        CreateMap<DbLinkRecord, DtoLinkRecord>()
            .ReverseMap();

        CreateMap<DbPaymentFailure, DtoPaymentFailure>()
            .ReverseMap();

        CreateMap<DbPaymentFailure, DtoPaymentFailure>()
            .ReverseMap();

        CreateMap<DtoPersonTeamAssociation, DtoPersonTeamAssociation>()
            .ReverseMap();

    }
}
