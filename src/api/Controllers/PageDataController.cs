using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.DatabaseModels;
using Aspen.Api;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PageDataController : ControllerBase
    {
        private readonly AspenContext context;

        public PageDataController(AspenContext context)
        {
            this.context = context;
        }

        // GET: api/PageData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PageData>>> GetPageData()
        {
            return await context.PageData.ToListAsync();
        }

        // GET: api/PageData/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<PageData>> GetPageData(int id)
        {
            var pageData = await context.PageData.FindAsync(id);

            if (pageData == null)
            {
                return NotFound();
            }

            return pageData;
        }

        [HttpGet("{key:alpha}")]
        public async Task<ActionResult<PageData>> GetPageData(string key)
        {
            var pageData = await context.PageData.FirstOrDefaultAsync(p => p.Key == key);
            if (pageData == null)
                return NotFound();
            return pageData;
        }

        // PUT: api/PageData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "admin-aspen")]
        public async Task<IActionResult> PutPageData(int id, PageData pageData)
        {
            if (id != pageData.Id)
            {
                return BadRequest();
            }

            context.Entry(pageData).State = EntityState.Modified;

            try
            {
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
        public async Task<ActionResult<PageData>> PostPageData(PageData pageData)
        {
            context.PageData.Add(pageData);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetPageData", new { id = pageData.Id }, pageData);
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
