using Api.DbModels;
using Api.DtoModels;
using Api.Exceptions;
using Api.Models.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataAccess
{
    public interface IRegistrationRepository
    {
        Task<Registration> AddAsync(DtoRegistration dtoRegistration);
        Task DeleteAsync(long registrationID);
        Task<Registration> EditAsync(DtoRegistration registration);
        Task<IEnumerable<Registration>> GetAllAsync();
        Task<Registration> GetByIdAsync(long registrationID);
        Task<bool> ExistsAsync(long registrationID);
    }

    public class RegistrationRepository : IRegistrationRepository
    {
        private readonly AspenContext context;
        private readonly IMapper mapper;

        public RegistrationRepository(AspenContext context, IMapper mapper)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.mapper = mapper;
        }

        public async Task<bool> ExistsAsync(long id)
        {
            return await context.Registrations.AnyAsync(e => e.ID == id);
        }

        public async Task<IEnumerable<Registration>> GetAllAsync()
        {
            var dbRegistrations = await EntityFrameworkQueryableExtensions
                .ToListAsync(context.Registrations);
            return mapper.Map<List<Registration>>(dbRegistrations);
        }

        public async Task<Registration> GetByIdAsync(long registrationID)
        {
            var dbRegistration = await context.Registrations.FindAsync(registrationID);
            if (dbRegistration == null)
                throw new NotFoundException<Registration>();
            return mapper.Map<Registration>(dbRegistration);
        }

        public async Task<Registration> AddAsync(DtoRegistration dtoRegistration)
        {
            var dbRegistration = mapper.Map<DbRegistration>(dtoRegistration);
            context.Registrations.Add(dbRegistration);
            await context.SaveChangesAsync();
            return mapper.Map<Registration>(dbRegistration);
        }

        public async Task<Registration> EditAsync(DtoRegistration registration)
        {
            var dbRegistration = mapper.Map<DbRegistration>(registration);
            context.Update(dbRegistration);
            await context.SaveChangesAsync();
            return mapper.Map<Registration>(dbRegistration);
        }

        public async Task DeleteAsync(long registrationID)
        {
            var registration = await context.Registrations.FindAsync(registrationID);

            context.Registrations.Remove(registration);
            await context.SaveChangesAsync();
        }

    }
}
