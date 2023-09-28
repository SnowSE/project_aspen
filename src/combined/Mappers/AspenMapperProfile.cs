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
