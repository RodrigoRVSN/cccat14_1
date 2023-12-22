import { Cpf } from "../src/domain/Cpf";

describe("CpfValidator", () => {
  it.each(["56318596020", "26120036067", "19915748000"])(
    "should test valid CPF %s",
    async (cpf: string) => {
      expect(new Cpf(cpf)).toBeTruthy();
    }
  );

  it.each(["", undefined, null, "11111111111", "111", "11111111111111"])(
    "should test invalid CPF %s",
    async (cpf: any) => {
      expect(() => new Cpf(cpf)).toThrowError("Invalid CPF");
    }
  );
});
