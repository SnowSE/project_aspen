using combined.Models.DbModels;
using combined.Models.Entities;

namespace Api.DataAccess;

public interface IPaymentFailureRepository
{
    Task<DtoPaymentFailure> Add(DtoPaymentFailure paymentFailure);
    Task<DtoPaymentFailure> GetByIdAsync(int paymentFailureId);
    Task<IEnumerable<DtoPaymentFailure>> GetAllAsync();

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

    public async Task<DtoPaymentFailure> Add(DtoPaymentFailure paymentFailure)
    {
        var dbPaymentFailure = mapper.Map<DbPaymentFailure>(paymentFailure);
        await context.PaymentFailures.AddAsync(dbPaymentFailure);

        await context.SaveChangesAsync();
        return mapper.Map<DtoPaymentFailure>(dbPaymentFailure);
    }

    public async Task<IEnumerable<DtoPaymentFailure>> GetAllAsync()
    {
        var paymentFailureList = await EntityFrameworkQueryableExtensions.ToListAsync(context.PaymentFailures);
        return mapper.Map<IEnumerable<DbPaymentFailure>, IEnumerable<DtoPaymentFailure>>(paymentFailureList);
    }

    public async Task<DtoPaymentFailure> GetByIdAsync(int id)
    {
        var e = await context.PaymentFailures.FindAsync(id);
        return mapper.Map<DtoPaymentFailure>(e);
    }
}