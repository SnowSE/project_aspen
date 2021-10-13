using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aspen.Api.DbModels;
using Aspen.Api.DtoModels;
using AutoMapper;

namespace Aspen.Api.Mappers
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
