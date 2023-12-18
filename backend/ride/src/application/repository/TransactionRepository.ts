export interface TransactionRepository {
  save(transaction: Transaction): Promise<void>
}