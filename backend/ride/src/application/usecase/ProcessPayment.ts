type Input = {
  rideId: string
  amount: number
  creditCardToken: string
}

export class ProcessPayment {
  constructor(readonly transactionRepository: TransactionRepository) { }

  async execute(input: Input): Promise<void> {
    const transaction = Transaction.create(input.rideId, input.amount);
    await this.transactionRepository.save(transaction);
  }

}