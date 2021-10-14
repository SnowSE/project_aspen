using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api;
using Microsoft.AspNetCore.Authorization;
using Api.DataAccess;
using Api.DtoModels;
using AutoMapper;
using Api.DbModels;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PageDataController : ControllerBase
    {
        private readonly AspenContext context;
        private readonly IMapper mapper;

        public PageDataController(AspenContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        // GET: api/PageData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DbPageData>>> GetPageData()
        {
            return await context.PageData.ToListAsync();
        }

        // GET: api/PageData/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<DtoPageData>> GetPageData(int id)
        {
            var pageData = await context.PageData.FindAsync(id);

            if (pageData == null)
            {
                return NotFound();
            }

            return mapper.Map<DtoPageData>(pageData);
        }

        [HttpGet("{key:alpha}")]
        public async Task<ActionResult<DtoPageData>> GetPageData(string key)
        {
            var pageData = await context.PageData.FirstOrDefaultAsync(p => p.Key == key);
            if (pageData == null)
                return NotFound();

            return mapper.Map<DtoPageData>(pageData);
        }

        // PUT: api/PageData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "admin-aspen")]
        public async Task<IActionResult> PutPageData(int id, DtoPageData pageData)
        {
            var dbPageData = mapper.Map<DbPageData>(pageData);
            var existingPageData = await context.PageData.FirstOrDefaultAsync(p => p.Key == pageData.Key);

            if (existingPageData == null)
            {
                return BadRequest();
            }

            try
            {
                existingPageData.Data = pageData.Data;
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PageDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PageData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "admin-aspen")]
        public async Task<ActionResult<DtoPageData>> PostPageData(DtoPageData pageData)
        {
            var dbPageData = mapper.Map<DbPageData>(pageData);
            context.PageData.Add(dbPageData);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetPageData", new { id = dbPageData.Id }, pageData);
        }

        // DELETE: api/PageData/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin-aspen")]
        public async Task<IActionResult> DeletePageData(int id)
        {
            var pageData = await context.PageData.FindAsync(id);
            if (pageData == null)
            {
                return NotFound();
            }

            context.PageData.Remove(pageData);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool PageDataExists(int id)
        {
            return context.PageData.Any(e => e.Id == id);
        }
    }
}
