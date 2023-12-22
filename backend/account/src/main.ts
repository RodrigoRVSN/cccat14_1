import { AccountRepositoryDatabase } from "./infra/repository/AccountRepositoryDatabase";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { GetAccount } from "./application/usecase/GetAccount";
import { LoggerConsole } from "./infra/logger/LoggerConsole";
import { MainController } from "./infra/controller/MainController";
import { PgPromiseAdapter } from "./infra/database/PgPromiseAdapter";
import { Signup } from "./application/usecase/Signup";
import { Registry } from "./infra/di/Registry";

const httpServer = new ExpressAdapter()
const databaseConnection = new PgPromiseAdapter();
const accountRepository = new AccountRepositoryDatabase(
  databaseConnection
);
const logger = new LoggerConsole();
const signup = new Signup(accountRepository, logger);
const getAccount = new GetAccount(accountRepository);

const registry = Registry.getInstance()
registry.register("httpServer", httpServer)
registry.register("signup", signup)
registry.register("getAccount", getAccount)

new MainController();
httpServer.listen(3001)