using System;
using System.Data;
using System.Threading.Tasks;
using Aspen.Core.Models;
using Aspen.Core.Repositories;

namespace Aspen.Core.Services
{
    public static class SeedService
    {
        public static void SeedAll(ICharityRepository charityRepository)
        {
            var task = Task.Run(async () => {
                await SeedCharity(charityRepository);
            });
            task.Wait();
        }

        public static async Task SeedCharity(ICharityRepository charityRepository)
        {
            var penguinDomain = new Domain("kylerspenguins.com");
            var kylersPenguins = new Charity(
                Guid.NewGuid(), "Kyler's Penguins", "kyler has a lot of penguins", new Domain[] { penguinDomain });

            var dbCharity = await charityRepository.GetByDomain(penguinDomain);
            if(dbCharity != kylersPenguins)
            {
                await charityRepository.Create(kylersPenguins);
            }
        }
    }
}