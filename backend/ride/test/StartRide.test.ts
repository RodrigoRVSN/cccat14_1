import { AcceptRide } from "../src/AcceptRide";
import { AccountRepositoryDatabase } from "../src/AccountRepositoryDatabase";
import { GetRide } from "../src/GetRide";
import { LoggerConsole } from "../src/LoggerConsole";
import { RequestRide } from "../src/RequestRide";
import { RideRepositoryDatabase } from "../src/RideRepositoryDatabase";
import { Signup } from "../src/Signup";
import { StartRide } from "../src/StartRide";

let signup: Signup;
let requestRide: RequestRide;
let getRide: GetRide;
let acceptRide: AcceptRide;
let startRide: StartRide;

describe("Start ride", () => {
  beforeEach(() => {
    const accountRepository = new AccountRepositoryDatabase();
    const rideRepository = new RideRepositoryDatabase();
    const logger = new LoggerConsole();
    signup = new Signup(accountRepository, logger);
    requestRide = new RequestRide(rideRepository, accountRepository, logger);
    acceptRide = new AcceptRide(rideRepository, accountRepository);
    startRide = new StartRide(rideRepository);
    getRide = new GetRide(rideRepository, logger);
  });

  it("should be able to start a ride", async () => {
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
    const inputStartRide = {
      rideId: outputRequestRide.rideId,
    };
    await startRide.execute(inputStartRide);
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide?.getStatus()).toBe("in_progress");
  });
});
