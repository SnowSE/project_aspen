using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;

namespace Api.Models.Entities;

public class Link
{
    public long Id { get; init; }
    public long EventID { get; init; }
    public long PersonID { get; init; }
    public DateTime Date { get; init; }
    public string LinkURL { get; init; }
}

