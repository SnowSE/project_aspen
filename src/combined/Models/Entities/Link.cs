using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;

namespace Api.Models.Entities;

public class Link
{
    public long Id { get; init; }
    public Event Event { get; init; }
    public Person Person { get; init; }
    public DateTime Date { get; init; }
    public string LinkURL { get; init; }
}

