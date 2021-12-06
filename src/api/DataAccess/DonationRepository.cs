﻿namespace Api.DataAccess;

public interface IDonationRepository
{
    Task<Donation> AddAsync(Donation donation);
    Task DeleteAsync(long id);
    Task EditAsync(Donation e);
    public Task<bool> ExistsAsync(long id);
    Task<Donation> GetByIdAsync(long id);
    Task<IEnumerable<Donation>> GetAllAsync();
    Task<IEnumerable<Donation>> GetByEventIdAsync(long eventId);
    Task<IEnumerable<Donation>> GetByTeamIdAsync(long eventId, long teamId);
    Task<decimal> GetTeamDonationSum(long eventID, long teamID);
    Task<decimal> GetEventDonationSum(long eventID);
}

public class DonationRepository : IDonationRepository
{
    private readonly AspenContext context;
    private readonly IMapper mapper;

    public DonationRepository(AspenContext context, IMapper mapper)
    {
        this.context = context ?? throw new ArgumentNullException(nameof(context));
        this.mapper = mapper;
    }

    public async Task<bool> ExistsAsync(long id)
    {
        return await context.Donations.AnyAsync(e => e.ID == id);
    }

    public async Task<IEnumerable<Donation>> GetAllAsync()
    {
        var DonationList = await EntityFrameworkQueryableExtensions.ToListAsync(context.Donations);
        return mapper.Map<IEnumerable<DbDonation>, IEnumerable<Donation>>(DonationList);
    }

    public async Task<Donation> GetByIdAsync(long id)
    {
        var e = await context.Donations.FindAsync(id);

        return mapper.Map<Donation>(e);
    }
    public async Task<Donation> AddAsync(Donation donation)
    {
        var newDonation = mapper.Map<DbDonation>(donation);
        context.Donations.Add(newDonation);
        await context.SaveChangesAsync();

        return mapper.Map<Donation>(newDonation);
    }

    public async Task EditAsync(Donation e)
    {
        var dbDonation = mapper.Map<DbDonation>(e);
        context.Update(dbDonation);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(long id)
    {
        var e = await context.Donations.FindAsync(id);
        if (e == null)
            throw new NotFoundException<Donation>("Donation id does not exist");
        context.Donations.Remove(e);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Donation>> GetByEventIdAsync(long eventId)
    {
        var donations = await context.Donations.Where(d => d.EventID == eventId).ToListAsync();
        return mapper.Map<IEnumerable<DbDonation>, IEnumerable<Donation>>(donations);
    }

    public async Task<IEnumerable<Donation>> GetByTeamIdAsync(long eventId, long teamId)
    {
        var donations = await context.Donations.Where(d => d.EventID == eventId && d.TeamID == teamId).ToListAsync();
        return mapper.Map<IEnumerable<DbDonation>, IEnumerable<Donation>>(donations);
    }

    public async Task<decimal> GetTeamDonationSum(long eventID, long teamID)
    {
        var sum = await context.Donations.Where(d => d.EventID == eventID && d.TeamID == teamID).SumAsync(d => d.Amount);
        return sum;
    }

    public async Task<decimal> GetEventDonationSum(long eventID)
    {
        var sum = await context.Donations.Where(d => d.EventID == eventID).SumAsync(d => d.Amount);
        return sum;
    }
}
