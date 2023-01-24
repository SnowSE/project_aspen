using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;

namespace Api.Models.Entities;

public class Link
{
    public long Id { get; init; }
    public DbEvent Event { get; init; }
    public DbPerson? Person { get; init; }
    public DateTime Date { get; init; }
    public string LinkURL { get; init; }
}

