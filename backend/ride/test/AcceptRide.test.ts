import { AcceptRide } from "../src/AcceptRide";
import { AccountRepositoryDatabase } from "../src/AccountRepositoryDatabase";
import { GetRide } from "../src/GetRide";
import { LoggerConsole } from "../src/LoggerConsole";
import { RequestRide } from "../src/RequestRide";
import { RideRepositoryDatabase } from "../src/RideRepositoryDatabase";
import { Signup } from "../src/Signup";

let signup: Signup;
let requestRide: RequestRide;
let getRide: GetRide;
let acceptRide: AcceptRide;

describe("Accept ride", () => {
  beforeEach(() => {
    const AccountRepository = new AccountRepositoryDatabase();
    const RideRepository = new RideRepositoryDatabase();
    const logger = new LoggerConsole();
    signup = new Signup(AccountRepository, logger);
    requestRide = new RequestRide(RideRepository, AccountRepository, logger);
    acceptRide = new AcceptRide(RideRepository, AccountRepository);
    getRide = new GetRide(RideRepository, logger);
  });

  it("should be able to accept a ride", async () => {
    const inputSignupPassenger = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      isPassenger: true,
      password: "123456",
    };
    const outputSignupPassenger = await signup.execute(inputSignupPassenger);
    const inputRequestRide = {
      passengerId: outputSignupPassenger.accountId,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    };
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    const inputSignupDriver = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      carPlate: "BBB1234",
      isPassenger: false,
      isDriver: true,
      password: "123456",
    };
    const outputSignupDriver = await signup.execute(inputSignupDriver);
    const inputAcceptRide = {
      rideId: outputRequestRide.rideId,
      driverId: outputSignupDriver.accountId,
    };
    await acceptRide.execute(inputAcceptRide);
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide?.getStatus()).toBe("accepted");
    expect(outputGetRide?.getDriverId()).toBe(outputSignupDriver.accountId);
  });

  it("should not be able to accept a ride if account is not of a driver", async () => {
    const inputSignupPassenger = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      isPassenger: true,
      password: "123456",
    };
    const outputSignupPassenger = await signup.execute(inputSignupPassenger);
    const inputRequestRide = {
      passengerId: outputSignupPassenger.accountId,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    };
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    const inputSignupDriver = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      isPassenger: true,
      password: "123456",
    };
    const outputSignupDriver = await signup.execute(inputSignupDriver);
    const inputAcceptRide = {
      rideId: outputRequestRide.rideId,
      driverId: outputSignupDriver.accountId,
    };
    await expect(() => acceptRide.execute(inputAcceptRide)).rejects.toThrow(
      new Error("Only drivers can accept rides")
    );
  });
});
