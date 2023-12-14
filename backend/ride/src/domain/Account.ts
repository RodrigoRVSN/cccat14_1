import { isValidCpf } from "./CpfValidator";

export class Account {
  accountId: string
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;

  private constructor(accountId: string, name: string, email: string, cpf: string, carPlate: string, isPassenger: boolean, isDriver: boolean) {
    if (this.isInvalidName(name)) throw new Error("Invalid name");
    if (this.isInvalidEmail(email)) throw new Error("Invalid email");
    if (!isValidCpf(cpf)) throw new Error("Invalid CPF");
    if (isDriver && this.isInvalidCarPlate(carPlate))
      throw new Error("Invalid car plate");
    this.accountId = accountId;
    this.name = name
    this.email = email
    this.cpf = cpf
    this.carPlate = carPlate
    this.isPassenger = isPassenger
    this.isDriver = isDriver
  }

  static create(name: string, email: string, cpf: string, carPlate: string, isPassenger: boolean, isDriver: boolean) {
    const accountId = crypto.randomUUID()
    return new Account(accountId, name, email, cpf, carPlate, isPassenger, isDriver)
  }

  static restore(accountId: string, name: string, email: string, cpf: string, carPlate: string, isPassenger: boolean, isDriver: boolean) {
    return new Account(accountId, name, email, cpf, carPlate, isPassenger, isDriver)
  }

  isInvalidName = (name: string) => !name.match(/[a-zA-Z] [a-zA-Z]+/);

  isInvalidEmail = (email: string) => !email.match(/^(.+)@(.+)$/);

  isInvalidCarPlate = (carPlate: string) =>
    !carPlate.match(/[A-Z]{3}[0-9]{4}/);
}