using Api.DbModels;
using Api.DtoModels;
using Api.Exceptions;
using Api.Models;
using Api.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataAccess{
    public interface IPageDataRepository
    {
        Task<PageData> Add(DtoPageData dtoPageData);
        Task Delete(string ID);
        Task<PageData> Edit(DtoPageData e);
        Task<PageData> GetByID(string ID);
    }

    public class PageDataRepository : IPageDataRepository
    {
        private readonly AspenContext _context;
        private readonly IMapper mapper;

        public PageDataRepository(AspenContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            this.mapper = mapper;
        }

        public async Task<PageData> Add(DtoPageData dtoPageData)
        {
            var dbPageData = mapper.Map<DbPageData>(dtoPageData);
            var returnedValue = await _context.PageData.AddAsync(dbPageData);
            return mapper.Map<PageData>(dbPageData);
        }

        public Task Delete(string ID)
        {
            throw new NotImplementedException();
        }

        public Task<PageData> Edit(DtoPageData e)
        {
            throw new NotImplementedException();
        }

        public async Task<PageData> GetByID(string ID)
        {
            var dbPageData = await _context.PageData.FindAsync(ID);
            if (dbPageData == null)
            {
                throw new PageDataNotFoundException();
            }
            return mapper.Map<PageData>(dbPageData);
        }
    }
}