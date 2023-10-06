export default class PaymentFailure {
    eventId: number;
    personId?: number | undefined;
    amount: number;
    code: string;
    decline_code?: string | undefined;
    message: string;
    id?: number;
    constructor(
      eventId: number,
      personId: number,
      amount: number,
      code: string,
      decline_code: string,
      message: string,
      id: number
    ) {
      this.eventId = eventId ?? 0;
      this.personId = personId ?? null;
      this.amount = amount ?? "";
      this.code = code ?? "";
      this.decline_code = decline_code ?? "";
      this.message = message ?? "";
      this.id = id ?? - 1;
    }
  }
