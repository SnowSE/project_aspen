using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;

namespace v2.Models.Entities;

public class LinkRecord
{
    public long Id { get; init; }
    public long LinkID { get; init; }
    public long? PersonID { get; init; }
    public DateTime Date { get; init; }

}

