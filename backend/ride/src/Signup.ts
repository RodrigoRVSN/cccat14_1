import { AccountDAO } from "./AccountDAO";
import { isValidCpf } from "./CpfValidator";

export class Signup {
  accountDAO: AccountDAO

  constructor() {
    this.accountDAO = new AccountDAO();
  }

  isInvalidName = (name: string) => !name.match(/[a-zA-Z] [a-zA-Z]+/);

  isInvalidEmail = (email: string) => !email.match(/^(.+)@(.+)$/);

  isInvalidCarPlate = (carPlate: string) =>
    !carPlate.match(/[A-Z]{3}[0-9]{4}/);

  execute = async (input: any): Promise<{ accountId: string }> => {
    input.accountId = crypto.randomUUID();
    const account = await this.accountDAO.getByEmail(input.email);
    if (account) throw new Error("Duplicated account");
    if (this.isInvalidName(input.name)) throw new Error("Invalid name");
    if (this.isInvalidEmail(input.email)) throw new Error("Invalid email");
    if (!isValidCpf(input.cpf)) throw new Error("Invalid CPF");
    if (input.isDriver && this.isInvalidCarPlate(input.carPlate))
      throw new Error("Invalid car plate");
    await this.accountDAO.save(input);
    return { accountId: input.accountId };
  };
}
