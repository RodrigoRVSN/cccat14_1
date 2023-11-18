import { GetAccount } from "../src/GetAccount";
import { Signup } from "../src/Signup";

let signup: Signup;
let getAccount: GetAccount;

describe("Signup", () => {
  beforeEach(() => {
    signup = new Signup();
    getAccount = new GetAccount();
  });

  it("should be able to create account", async () => {
    const inputSignup = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "56318596020",
      isPassenger: true,
    };

    const { accountId } = await signup.execute(inputSignup);
    const account = await getAccount.execute(accountId);

    expect(accountId).toBeDefined();
    expect(account.name).toBe(inputSignup.name);
    expect(account.email).toBe(inputSignup.email);
  });

  it("should not be able to create account with invalid CPF", async () => {
    const inputSignup = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "11111111111",
      isPassenger: true,
    };

    await expect(() => signup.execute(inputSignup)).rejects.toThrow(
      "Invalid CPF"
    );
  });

  it("should not be able to create account with invalid email", async () => {
    const inputSignup = {
      name: "John Doe",
      email: `johndoe${Math.random()}`,
      cpf: "56318596020",
      isPassenger: true,
    };

    await expect(() => signup.execute(inputSignup)).rejects.toThrow(
      "Invalid email"
    );
  });

  it("should not be able to create account with invalid name", async () => {
    const inputSignup = {
      name: "123",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "56318596020",
      isPassenger: true,
    };

    await expect(() => signup.execute(inputSignup)).rejects.toThrow(
      "Invalid name"
    );
  });

  it("should not be able to create account with duplicated email", async () => {
    const inputSignup = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "56318596020",
      isPassenger: true,
    };

    await signup.execute(inputSignup);
    await expect(() => signup.execute(inputSignup)).rejects.toThrow(
      "Duplicated account"
    );
  });

  it("should be able to create driver account", async () => {
    const inputSignup = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "56318596020",
      carPlate: "BBB1234",
      isDriver: true,
    };

    const { accountId } = await signup.execute(inputSignup);
    const account = await getAccount.execute(accountId);

    expect(accountId).toBeDefined();
    expect(account.name).toBe(inputSignup.name);
    expect(account.email).toBe(inputSignup.email);
  });

  it("should not be able to create driver account with invalid car plate", async () => {
    const inputSignup = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "56318596020",
      carPlate: "BBB123",
      isDriver: true,
    };

    await expect(() => signup.execute(inputSignup)).rejects.toThrow(
      "Invalid car plate"
    );
  });
});
