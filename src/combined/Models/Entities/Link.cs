using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;

namespace v2.Models.Entities;

public class Link
{
    public long Id { get; init; }
    public long EventID { get; init; }
    public long PersonID { get; init; }
    public DateTime Date { get; init; }
    public string LinkURL { get; init; }
    public string LinkGUID { get; init; }
}

