export class Cpf {
  constructor(readonly value: string) {
    if (!this.isValidCpf(value)) throw new Error("Invalid CPF");
  }

  private isValidLength = (cpf: string) => cpf.length < 11 && cpf.length > 14;

  private clean = (cpf: string) => cpf.replace(/\D/g, "");

  private allDigitsAreTheSame = (cpf: string) =>
    cpf.split("").every((c) => c === cpf[0]);

  private calculateDigit = (cpf: string, factor: number) => {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) {
        total += parseInt(digit) * factor--;
      }
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  private extractCheckDigit = (cpf: string) => cpf.slice(9);

  private isValidCpf = (cpf: string) => {
    if (!cpf) return false;
    cpf = this.clean(cpf);
    if (this.isValidLength(cpf)) return false;
    if (this.allDigitsAreTheSame(cpf)) return false;
    const dg1 = this.calculateDigit(cpf, 10);
    const dg2 = this.calculateDigit(cpf, 11);
    return this.extractCheckDigit(cpf) === `${dg1}${dg2}`;
  };
}
