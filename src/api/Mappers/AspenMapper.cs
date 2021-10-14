using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DbModels;
using Api.DtoModels;
using AutoMapper;

namespace Api.Mappers
{
    public class AspenMapper : Profile
    {
        public AspenMapper()
        {
            CreateMap<DbEvent, DtoEvent>();
            CreateMap<DtoEvent, DbEvent>();
            CreateMap<DbPageData, DtoPageData>();
            CreateMap<DtoPageData, DbPageData>();
        }
    }
}
