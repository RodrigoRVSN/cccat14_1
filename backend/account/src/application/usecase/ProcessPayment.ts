import { Transaction } from "../../domain/Transaction";
import { TransactionRepository } from "../repository/TransactionRepository";

type Input = {
  rideId: string
  amount: number
  creditCardToken: string
}

export class ProcessPayment {
  constructor(readonly transactionRepository: TransactionRepository) { }

  async execute(input: Input): Promise<void> {
    const transaction = Transaction.create(input.rideId, input.amount);
    transaction.pay()
    await this.transactionRepository.save(transaction);
  }
}