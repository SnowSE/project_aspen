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
    /*[Authorize]*/
    [ApiController]
    public class PageDataController : ControllerBase
    {
        private readonly IPageDataRepository pageDataRepository;

        public PageDataController(IPageDataRepository pageDataRepository)
        {
            this.pageDataRepository = pageDataRepository;
        }

        // GET: api/PageData
        [HttpGet]
        public async Task<IEnumerable<DtoPageData>> GetPageData()
        {
            return await pageDataRepository.GetAllPageDataAsync();
        }

        [HttpGet("{key}")]
        public async Task<ActionResult<DtoPageData>> GetPageData(string key)
        {
            var pageData = await pageDataRepository.GetPageDataAsync(key);
            if (pageData == null)
                return NotFound();
            return pageData;
        }

        // PUT: api/PageData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{key}")]
        /*[Authorize(Roles = "admin-aspen")]*/
        public async Task<IActionResult> EditPageData(string key, DtoPageData pageData)
        {
            try
            {
                await pageDataRepository.EditPageDataAsync(key, pageData);
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;

            }

            return NoContent();
        }

        // POST: api/PageData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        /*[Authorize(Roles = "admin-aspen")]*/
        public async Task<ActionResult<DtoPageData>> PostPageData(DtoPageData pageData)
        {
            var pgData = await pageDataRepository.AddPageDataAsync(pageData);

            return CreatedAtAction("GetPageData", pgData);
        }

        // DELETE: api/PageData/5
        // DELETE: api/PageData?key={key}
        [HttpDelete("{key}")]
        /*[Authorize(Roles = "admin-aspen")]*/
        public async Task<IActionResult> DeletePageData(string key)
        {

            await pageDataRepository.DeletePageDataAsync(key);

            return NoContent();
        }
    }
}
