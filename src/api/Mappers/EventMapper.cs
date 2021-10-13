using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aspen.Api.DbModels;
using Aspen.Api.DtoModels;
using AutoMapper;

namespace Aspen.Api.Mappers
{
    public class EventMapper : Profile
    {
        public EventMapper()
        {
            CreateMap<DbEvent, DtoEvent>();
        }
    }
}
