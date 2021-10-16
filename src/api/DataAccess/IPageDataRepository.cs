using Api.DtoModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface IPageDataRepository
    {
        Task<DtoPageData> AddPageDataAsync(DtoPageData pageData);
        Task DeletePageDataAsync(string pageDataID);
        Task EditPageDataAsync(string key, DtoPageData pageData);
        Task<IEnumerable<DtoPageData>> GetAllPageDataAsync();
        Task<DtoPageData> GetPageDataAsync(string pageDataKey);
        bool PageDataExists(string pageDataKey);
    }
}