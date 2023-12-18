export class Transaction {
  constructor(readonly transactionId: string, readonly rideId: string, readonly amount: number, readonly date: Date, readonly status: string) { }

  static create(rideId: string, amount: number) {
    const transactionId = crypto.randomUUID()

  }
}