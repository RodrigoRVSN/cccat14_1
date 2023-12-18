import { PgPromiseAdapter } from "../src/infra/database/PgPromiseAdapter"

it('should process a payment', async () => {
  const connection = new PgPromiseAdapter()
  const transactionRepository = new TransactionRepository(connection)
  const processPayment = new ProcessPayment()
  const rideId = crypto.randomUUID()
  const inputProcessPayment = {
    rideId,
    creditCardToken: "123456789",
    amount: 1000
  }
  await processPayment.execute(inputProcessPayment)
  const getTransactionByRideId = new GetTransactionByRideId()
  const output = await getTransactionByRideId(rideId)
  await connection.close();
})