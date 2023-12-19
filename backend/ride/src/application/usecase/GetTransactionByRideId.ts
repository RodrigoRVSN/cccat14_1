import { Transaction } from "../../domain/Transaction";
import { TransactionRepository } from "../repository/TransactionRepository";

type Output = {
  rideId: string
  amount: number
  transactionId: string
  date: Date
  status: string
}

export class GetTransactionByRideId {
  constructor(readonly transactionRepository: TransactionRepository) { }

  async execute(rideId: string): Promise<Output> {
    const transaction = await this.transactionRepository.getByRideId(rideId)
    return {
      transactionId: transaction.transactionId,
      amount: transaction.amount,
      date: transaction.date,
      rideId: transaction.rideId,
      status: transaction.getStatus()
    }
  }

}