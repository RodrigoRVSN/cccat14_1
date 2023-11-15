import { getAccount, signup } from "../src/main";

describe("Signup", () => {
	it.each(["56318596020", "26120036067", "19915748000"])(
		"should be able to create account",
		async (cpf: string) => {
			const inputSignup = {
				name: "John Doe",
				email: `johndoe${Math.random()}@mail.com`,
				cpf,
				isPassenger: true,
			};

			const { accountId } = await signup(inputSignup);
			const account = await getAccount(accountId);

			expect(accountId).toBeDefined();
			expect(account.name).toBe(inputSignup.name);
			expect(account.email).toBe(inputSignup.email);
		}
	);

	it.each(["", undefined, null, "11111111111", "111", "11111111111111"])(
		"should not be able to create account with invalid CPF",
		async (cpf: string | null | undefined) => {
			const inputSignup = {
				name: "John Doe",
				email: `johndoe${Math.random()}@mail.com`,
				cpf,
				isPassenger: true,
			};

			await expect(() => signup(inputSignup)).rejects.toThrow("Invalid CPF");
		}
	);

	it("should not be able to create account with invalid email", async () => {
		const inputSignup = {
			name: "John Doe",
			email: `johndoe${Math.random()}`,
			cpf: "56318596020",
			isPassenger: true,
		};

		await expect(() => signup(inputSignup)).rejects.toThrow("Invalid email");
	});

	it("should not be able to create account with invalid name", async () => {
		const inputSignup = {
			name: "123",
			email: `johndoe${Math.random()}@mail.com`,
			cpf: "56318596020",
			isPassenger: true,
		};

		await expect(() => signup(inputSignup)).rejects.toThrow("Invalid name");
	});

	it("should not be able to create account with duplicated email", async () => {
		const inputSignup = {
			name: "John Doe",
			email: `johndoe${Math.random()}@mail.com`,
			cpf: "56318596020",
			isPassenger: true,
		};

		await signup(inputSignup);
		await expect(() => signup(inputSignup)).rejects.toThrow(
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

		const { accountId } = await signup(inputSignup);
		const account = await getAccount(accountId);

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

		await expect(() => signup(inputSignup)).rejects.toThrow("Invalid car plate");
	});
});
