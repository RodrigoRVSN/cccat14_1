import { Account } from "../src/domain/Account";

describe('Account', () => {
  it("should be able to create an account", function () {
    const account = Account.create("John Doe", "john.doe@gmail.com", "97456321558", "", true, false);
    expect(account.accountId).toBeDefined();
    expect(account.name.value).toBe("John Doe");
    expect(account.email.value).toBe("john.doe@gmail.com");
    expect(account.cpf.value).toBe("97456321558");
  });
})