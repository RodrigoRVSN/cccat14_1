import { Logger } from "./Logger";
import { Account } from "./Account";
import { AccountRepository } from "./AccountRepository";

export class Signup {
  accountRepository: AccountRepository
  logger: Logger

  constructor(accountRepository: AccountRepository, logger: Logger) {
    this.accountRepository = AccountRepository
    this.logger = logger
  }

  execute = async (input: any): Promise<{ accountId: string }> => {
    const existingAccount = await this.accountRepository.getByEmail(input.email);
    if (existingAccount) throw new Error("Duplicated account");
    const account = Account.create(input.name, input.email, input.cpf, input.carPlate, input.isPassenger, input.isDriver)
    await this.accountRepository.save(account);
    return { accountId: account.accountId };
  };
}
