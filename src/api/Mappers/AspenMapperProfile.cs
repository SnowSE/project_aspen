using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DbModels;
using Api.DtoModels;
using Api.Models;
using AutoMapper;

namespace Api.Mappers
{
    public class AspenMapperProfile : Profile
    {
        public AspenMapperProfile()
        {
            CreateMap<DbEvent, DtoEvent>()
                .ReverseMap();

            CreateMap<DbPageData, DtoPageData>()
                .ReverseMap();

            CreateMap<DbPerson, Person>()
                .ReverseMap();
        }
    }
}
