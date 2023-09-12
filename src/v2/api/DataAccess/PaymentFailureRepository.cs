using combined.Models.DbModels;
using combined.Models.Entities;

namespace Api.DataAccess;

public interface IPaymentFailureRepository
{
    Task<PaymentFailure> Add(PaymentFailure paymentFailure);
    Task<PaymentFailure> GetByIdAsync(int paymentFailureId);
    Task<IEnumerable<PaymentFailure>> GetAllAsync();

}

public class PaymentFailureRepository : IPaymentFailureRepository
{
    private readonly AspenContext context;
    private readonly IMapper mapper;

    public PaymentFailureRepository(AspenContext context, IMapper mapper)
    {
        this.context = context ?? throw new ArgumentNullException(nameof(context));
        this.mapper = mapper;
    }

    public async Task<PaymentFailure> Add(PaymentFailure paymentFailure)
    {
        var dbPaymentFailure = mapper.Map<DbPaymentFailure>(paymentFailure);
        await context.PaymentFailures.AddAsync(dbPaymentFailure);

        await context.SaveChangesAsync();
        return mapper.Map<PaymentFailure>(dbPaymentFailure);
    }

    public async Task<IEnumerable<PaymentFailure>> GetAllAsync()
    {
        var paymentFailureList = await EntityFrameworkQueryableExtensions.ToListAsync(context.PaymentFailures);
        return mapper.Map<IEnumerable<DbPaymentFailure>, IEnumerable<PaymentFailure>>(paymentFailureList);
    }

    public async Task<PaymentFailure> GetByIdAsync(int id)
    {
        var e = await context.PaymentFailures.FindAsync(id);
        return mapper.Map<PaymentFailure>(e);
    }
}