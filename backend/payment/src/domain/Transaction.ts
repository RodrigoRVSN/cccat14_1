export class Transaction {
  constructor(readonly transactionId: string, readonly rideId: string, readonly amount: number, readonly date: Date, private status: string) { }

  static create(rideId: string, amount: number) {
    const transactionId = crypto.randomUUID()
    const status = "waiting_payment"
    const date = new Date()
    return new Transaction(transactionId, rideId, amount, date, status)
  }

  pay() {
    this.status = "paid"
  }

  getStatus() {
    return this.status
  }
}