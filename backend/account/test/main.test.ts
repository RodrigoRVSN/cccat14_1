import axios from "axios";

axios.defaults.validateStatus = () => true;

describe("Signup", () => {
  it("should be able to create account", async () => {
    const inputSignup = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "56318596020",
      isPassenger: true,
    };

    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      inputSignup
    );
    const outputSignup = responseSignup.data;
    const responseGetAccount = await axios.get(
      `http://localhost:3000/accounts/${outputSignup.accountId}`
    );
    const outputGetAccount = responseGetAccount.data;

    expect(outputGetAccount.name).toBe(inputSignup.name);
    expect(outputGetAccount.email).toBe(inputSignup.email);
  });

  it("should not be able to create account with invalid name", async () => {
    const inputSignup = {
      name: "123",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "56318596020",
      isPassenger: true,
    };

    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      inputSignup
    );
    expect(responseSignup.status).toBe(422);
    expect(responseSignup.data.message).toBe("Invalid name");
  });

  it("should be able to create driver account", async () => {
    const inputSignup = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "56318596020",
      carPlate: "BBB1234",
      isDriver: true,
    };

    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      inputSignup
    );
    const outputSignup = responseSignup.data;
    const responseGetAccount = await axios.get(
      `http://localhost:3000/accounts/${outputSignup.accountId}`
    );
    const outputGetAccount = responseGetAccount.data;

    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(inputSignup.name);
    expect(outputGetAccount.email).toBe(inputSignup.email);
  });

  it("should not be able to create driver account with invalid car plate", async () => {
    const inputSignup = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "56318596020",
      carPlate: "BBB123",
      isDriver: true,
    };

    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      inputSignup
    );
    expect(responseSignup.status).toBe(422);
    expect(responseSignup.data.message).toBe("Invalid car plate");
  });
});
