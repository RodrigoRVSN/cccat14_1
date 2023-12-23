import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { MainController } from "./infra/controller/MainController";
import { PgPromiseAdapter } from "./infra/database/PgPromiseAdapter";
import { Registry } from "./infra/di/Registry";
import { TransactionRepositoryORM } from "./infra/repository/TransactionRepositoryORM";
import { ProcessPayment } from "./application/usecase/ProcessPayment";
import { GetTransactionByRideId } from "./application/usecase/GetTransactionByRideId";
import { QueueController } from "./infra/queue/QueueController";
import { Queue } from "./infra/queue/Queue";

const httpServer = new ExpressAdapter()
const databaseConnection = new PgPromiseAdapter();
const transactionRepository = new TransactionRepositoryORM(databaseConnection)

const processPayment = new ProcessPayment(transactionRepository)
const getTransactionByRideId = new GetTransactionByRideId(transactionRepository)

const registry = Registry.getInstance()
registry.register("queue", new Queue())
registry.register("httpServer", httpServer)
registry.register("processPayment", processPayment)
registry.register("getTransactionByRideId", getTransactionByRideId)

new QueueController()
new MainController();
httpServer.listen(3002)