import { AcceptRide } from "../src/application/usecase/AcceptRide";
import { AccountRepositoryDatabase } from "../src/infra/repository/AccountRepositoryDatabase";
import { DatabaseConnection } from "../src/infra/database/DatabaseConnection";
import { GetRide } from "../src/application/usecase/GetRide";
import { LoggerConsole } from "../src/infra/logger/LoggerConsole";
import { PgPromiseAdapter } from "../src/infra/database/PgPromiseAdapter";
import { RequestRide } from "../src/application/usecase/RequestRide";
import { RideRepositoryDatabase } from "../src/infra/repository/RideRepositoryDatabase";
import { Signup } from "../src/application/usecase/Signup";

let signup: Signup;
let requestRide: RequestRide;
let getRide: GetRide;
let acceptRide: AcceptRide;
let databaseConnection: DatabaseConnection;

describe("Accept ride", () => {
  beforeEach(() => {
    databaseConnection = new PgPromiseAdapter()
    const accountRepository = new AccountRepositoryDatabase(databaseConnection);
    const RideRepository = new RideRepositoryDatabase(databaseConnection);
    const logger = new LoggerConsole();
    signup = new Signup(accountRepository, logger);
    requestRide = new RequestRide(RideRepository, accountRepository, logger);
    acceptRide = new AcceptRide(RideRepository, accountRepository);
    getRide = new GetRide(RideRepository, logger);
  });

  afterEach(async () => {
    await databaseConnection.close();
  })

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
