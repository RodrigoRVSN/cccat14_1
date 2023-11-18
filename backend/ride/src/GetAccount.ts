import { AccountDAO } from "./AccountDAO";

export class GetAccount {
  execute = async (accountId: string) => {
    const accountDAO = new AccountDAO();
    const account = accountDAO.getById(accountId);
    return account;
  };
}
