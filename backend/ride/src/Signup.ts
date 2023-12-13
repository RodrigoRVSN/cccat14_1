import { Logger } from "./Logger";
import { Account } from "./Account";
import { AccountRepository } from "./AccountRepository";

export class Signup {
  AccountRepository: AccountRepository
  logger: Logger

  constructor(AccountRepository: AccountRepository, logger: Logger) {
    this.AccountRepository = AccountRepository
    this.logger = logger
  }

  execute = async (input: any): Promise<{ accountId: string }> => {
    const existingAccount = await this.AccountRepository.getByEmail(input.email);
    if (existingAccount) throw new Error("Duplicated account");
    const account = Account.create(input.name, input.email, input.cpf, input.carPlate, input.isPassenger, input.isDriver)
    await this.AccountRepository.save(account);
    return { accountId: account.accountId };
  };
}
