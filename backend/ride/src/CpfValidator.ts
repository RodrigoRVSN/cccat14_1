const isValidLength = (cpf: string) => cpf.length < 11 && cpf.length > 14;

const clean = (cpf: string) => cpf.replace(/\D/g, "");

const allDigitsAreTheSame = (cpf: string) =>
  cpf.split("").every((c) => c === cpf[0]);

const calculateDigit = (cpf: string, factor: number) => {
  let total = 0;
  for (const digit of cpf) {
    if (factor > 1) {
      total += parseInt(digit) * factor--;
    }
  }
  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
};

const extractCheckDigit = (cpf: string) => cpf.slice(9);

export const isValidCpf = (cpf: string) => {
  if (!cpf) return false;
  cpf = clean(cpf);
  if (isValidLength(cpf)) return false;
  if (allDigitsAreTheSame(cpf)) return false;
  const dg1 = calculateDigit(cpf, 10);
  const dg2 = calculateDigit(cpf, 11);
  return extractCheckDigit(cpf) === `${dg1}${dg2}`;
};
