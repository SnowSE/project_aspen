using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DbModels;
using Api.DtoModels;
using Api.Models;
using Api.Models.Entities;
using AutoMapper;

namespace Api.Mappers
{
    public class AspenMapperProfile : Profile
    {
        /// <summary>
        /// Rules to go to and frome different object types
        /// </summary>
        /// <seealso cref="https://codewithmukesh.com/blog/automapper-in-aspnet-core/"/>
        public AspenMapperProfile()
        {
            CreateMap<DbEvent, DtoEvent>()
                .ReverseMap();

            CreateMap<DbPageData, DtoPageData>()
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
        }
    }
}
