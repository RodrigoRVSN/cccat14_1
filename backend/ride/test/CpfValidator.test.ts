import { isValidCpf } from "../src/CpfValidator";

describe("CpfValidator", () => {
  it.each(["56318596020", "26120036067", "19915748000"])(
    "should be able to create account",
    async (cpf: string) => {
      expect(isValidCpf(cpf)).toBeTruthy();
    }
  );

  it.each(["", undefined, null, "11111111111", "111", "11111111111111"])(
    "should not be able to create account with invalid CPF",
    async (cpf: any) => {
      expect(isValidCpf(cpf)).toBeFalsy();
    }
  );
});
