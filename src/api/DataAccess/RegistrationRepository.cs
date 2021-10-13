using Aspen.Api.DbModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aspen.Api.DataAccess
{
    public class RegistrationRepository
    {
        private readonly AspenContext _context;

        public RegistrationRepository(AspenContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        private bool RegistrationExists(string registrationID)
        {
            return _context.Registrations.Any(e => e.ID == registrationID);
        }

        //Get all Registrations
        public async Task<IEnumerable<DbRegistration>> GetRegistrationsAsync()
        {
            return await EntityFrameworkQueryableExtensions.ToListAsync(_context.Registrations);

        }

        //Add Registration

        public async Task AddRegistrationAsync(DbRegistration registration)
        {
            if (!RegistrationExists(registration.ID))
            {
                _context.Registrations.Add(registration);
                await _context.SaveChangesAsync();
            }
        }

        //edit Registration
        public async Task EditRegistrationAsync(DbRegistration registration)
        {
            _context.Update(registration);
            await _context.SaveChangesAsync();
        }

        //delete Registration
        public async Task DeleteRegistrationAsync(string registrationID)
        {
            var registration = await _context.Registrations.FindAsync(registrationID);

            _context.Registrations.Remove(registration);
            await _context.SaveChangesAsync();
        }

    }
}
