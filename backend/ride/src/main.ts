import express, { Request, Response } from "express";
import { Signup } from "./Signup";
import { GetAccount } from "./GetAccount";
import { AccountRepositoryDatabase } from "./AccountRepositoryDatabase";
import { LoggerConsole } from "./LoggerConsole";
import { PgPromiseAdapter } from "./PgPromiseAdapter";

const app = express();
app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
	try {
		const input = req.body;
		const databaseConnection = new PgPromiseAdapter()
		const accountRepository = new AccountRepositoryDatabase(databaseConnection);
		const logger = new LoggerConsole();
		const signup = new Signup(accountRepository, logger)
		const output = await signup.execute(input);
		res.json(output);
	} catch (error: any) {
		res.status(422).json({ message: error.message });
	}
});

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
	const { accountId } = req.params;
	const databaseConnection = new PgPromiseAdapter()
	const accountRepository = new AccountRepositoryDatabase(databaseConnection);
	const getAccount = new GetAccount(accountRepository)
	const account = await getAccount.execute(accountId);
	res.json(account);
});

app.listen(3000, () => console.log('Server running!'));