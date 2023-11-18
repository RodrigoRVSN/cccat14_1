import { SignupAccountDAO } from "./SignupAccountDAO";
import { isValidCpf } from "./CpfValidator";
import { Logger } from "./Logger";

export class Signup {
  accountDAO: SignupAccountDAO
  logger: Logger

  constructor(accountDAO: SignupAccountDAO, logger: Logger) {
    this.accountDAO = accountDAO
    this.logger = logger
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
