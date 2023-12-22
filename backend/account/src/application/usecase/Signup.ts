import { Account } from "../../domain/Account";
import { Logger } from "../logger/Logger";
import { AccountRepository } from "../repository/AccountRepository";


type Input = {
  name: string;
  email: string;
  cpf: string;
  carPlate?: string;
  isPassenger?: boolean;
  isDriver?: boolean;
};

type Output = {
  accountId: string;
}

export class Signup {
  constructor(
    private accountRepository: AccountRepository,
    private logger: Logger
  ) { }

  execute = async (input: Input): Promise<Output> => {
    this.logger.log("signup");
    const existingAccount = await this.accountRepository.getByEmail(
      input.email
    );
    if (existingAccount) throw new Error("Duplicated account");
    const account = Account.create(
      input.name,
      input.email,
      input.cpf,
      input.carPlate || "",
      !!input.isPassenger,
      !!input.isDriver
    );
    await this.accountRepository.save(account);
    return { accountId: account.accountId };
  };
}
