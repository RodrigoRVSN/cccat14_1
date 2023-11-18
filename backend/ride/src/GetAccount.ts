import { GetAccountDAO } from "./GetAccountDAO";

export class GetAccount {
  constructor(private accountDAO: GetAccountDAO) { }

  execute = async (accountId: string) => {
    const account = this.accountDAO.getById(accountId);
    return account;
  };
}
