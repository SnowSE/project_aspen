using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Aspen.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace aspen.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ICharityRepository charityRepository;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ICharityRepository charityRepository)
        {
            _logger = logger;
            this.charityRepository = charityRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Charity>> Get()
        {
            var newcharity = new Charity(){
                CharityName="Kylers Penguins",
                CharityDescription = "we like cold"
            };
            await charityRepository.CreateCharity(newcharity);
            return await charityRepository.GetAll();
        }
    }
}
