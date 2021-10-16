using Api.DbModels;
using Api.DtoModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public class PageDataRepository : IPageDataRepository
    {
        private readonly AspenContext context;
        private readonly IMapper mapper;

        public PageDataRepository(AspenContext context, IMapper mapper)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.mapper = mapper;
        }

        public bool PageDataExists(string pageDataKey)
        {
            return context.PageData.Any(e => e.Key == pageDataKey);
        }

        public async Task<IEnumerable<DtoPageData>> GetAllPageDataAsync()
        {
            var AllPageData = await EntityFrameworkQueryableExtensions.ToListAsync(context.PageData);
            return mapper.Map<IEnumerable<DbPageData>, IEnumerable<DtoPageData>>(AllPageData);
        }

        public async Task<DtoPageData> GetPageDataAsync(string pageDataKey)
        {
            var dbPageData = await context.PageData.FirstOrDefaultAsync(r => r.Key == pageDataKey);
            return mapper.Map<DtoPageData>(dbPageData);
        }

        public async Task<DtoPageData> AddPageDataAsync(DtoPageData pageData)
        {
            var dbPageData = mapper.Map<DbPageData>(pageData);

            await context.PageData.AddAsync(dbPageData);
            await context.SaveChangesAsync();

            return mapper.Map<DtoPageData>(dbPageData);
        }

        public async Task EditPageDataAsync(string key, DtoPageData pageData)
        {
            var existingDbPageData = await context.PageData.AsNoTracking().FirstOrDefaultAsync(r => r.Key == key);
            var mappedPageData = mapper.Map<DbPageData>(pageData);
            mappedPageData.ID = existingDbPageData.ID;

            context.Update(mappedPageData);
            await context.SaveChangesAsync();
        }

        public async Task DeletePageDataAsync(string pageDataKey)
        {
            var pageData = await context.PageData.FirstOrDefaultAsync(r => r.Key == pageDataKey);

            context.PageData.Remove(pageData);
            await context.SaveChangesAsync();
        }
    }
}
