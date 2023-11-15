import crypto from "crypto";
import pgp from "pg-promise";

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
}

const isInvalidName = (name: string) => !name.match(/[a-zA-Z] [a-zA-Z]+/);

const isInvalidEmail = (email: string) => !email.match(/^(.+)@(.+)$/);

const isInvalidCarPlate = (carPlate: string) =>
	!carPlate.match(/[A-Z]{3}[0-9]{4}/);

export const signup = async (input: any): Promise<{ accountId: string }> => {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	try {
		const accountId = crypto.randomUUID();

		const [account] = await connection.query(
			"select * from cccat14.account where email = $1",
			[input.email]
		);
		if (account) throw new Error('Duplicated account');
		if (isInvalidName(input.name)) throw new Error('Invalid name');
		if (isInvalidEmail(input.email)) throw new Error('Invalid email');
		if (!isValidCpf(input.cpf)) throw new Error('Invalid CPF');
		if (input.isDriver && isInvalidCarPlate(input.carPlate)) throw new Error('Invalid car plate');

		await connection.query(
			"insert into cccat14.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
			[
				accountId,
				input.name,
				input.email,
				input.cpf,
				input.carPlate,
				!!input.isPassenger,
				!!input.isDriver,
			]
		);

		return { accountId };
	} finally {
		await connection.$pool.end();
	}
}

export const getAccount = async (accountId: string) => {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	const [account] = await connection.query(
		"select * from cccat14.account where account_id = $1",
		[accountId]
	);
	await connection.$pool.end();
	return account;
}
