import { AccountRepository } from "./AccountRepository";

export class GetAccount {
  constructor(private AccountRepository: AccountRepository) { }

  execute = async (accountId: string) => {
    const account = this.AccountRepository.getById(accountId);
    return account;
  };
}
