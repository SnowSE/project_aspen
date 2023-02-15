﻿using combined.Models.DbModels;
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
        CreateMap<DbEvent, Event>()
            .ReverseMap();

        CreateMap<Event, DtoEvent>()
            .ReverseMap();

        CreateMap<DbPerson, Person>()
            .ReverseMap();

        CreateMap<Person, DtoPerson>()
            .ReverseMap();

        CreateMap<DbTeam, DtoTeam>()
            .ReverseMap();

        CreateMap<DtoTeam, Team>()
            .ReverseMap();

        CreateMap<DbTeam, Team>()
            .ReverseMap();

        CreateMap<DbEvent, Event>()
            .ReverseMap();

        CreateMap<DtoEvent, Event>()
            .ReverseMap();

        CreateMap<DtoRegistration, Registration>()
            .ReverseMap();

        CreateMap<DbRegistration, Registration>()
            .ReverseMap();

        CreateMap<DbPersonRegistration, PersonRegistration>()
            .ReverseMap();

        CreateMap<DtoPersonRegistration, PersonRegistration>()
            .ReverseMap();

        CreateMap<DbDonation, Donation>()
            .ReverseMap();

        CreateMap<DtoDonation, Donation>();

        CreateMap<Donation, DtoDonation>()
            .ForMember(dest => dest.TeamName, opt => opt.MapFrom(src => src.Team.Name))
            .ForMember(dest => dest.PersonName, opt => opt.MapFrom(src => src.Person.Name));

        CreateMap<DbLink, Link>()
            .ReverseMap();

        CreateMap<Link, DtoLink>()
            .ReverseMap();

        CreateMap<DbLinkRecord, LinkRecord>()
            .ReverseMap();

        CreateMap<LinkRecord, DtoLinkRecord>()
            .ReverseMap();

        CreateMap<DbPaymentFailure, PaymentFailure>()
            .ReverseMap();

        CreateMap<PaymentFailure, DtoPaymentFailure>()
            .ReverseMap();
    }
}
