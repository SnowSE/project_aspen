using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;

namespace Api.Models.Entities;

public record Donation
{
    public long ID { get; init; }
    public long? TeamID { get; init; }
    public Team Team { get; init; }
    public long? PersonID { get; init; }
    public Person Person { get; init; }
    public DateTime Date { get; init; }
    public decimal Amount { get; init; }
    public bool IsPending { get; init; } = true;
    public long? Link { get; init; }
    public Guid TransactionNumber { get; init; }

    public string? AuthorizationNumber { get; init; }
    public string? LinkGuid { get; init; }
}
