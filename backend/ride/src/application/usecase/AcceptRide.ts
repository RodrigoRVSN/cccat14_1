import { RideRepository } from "../repository/RideRepository";
import { AccountRepository } from "../repository/AccountRepository";

export class AcceptRide {
  constructor(private rideRepository: RideRepository, private accountRepository: AccountRepository) { }

  async execute(input: any) {
    const account = await this.accountRepository.getById(input.driverId)
    if (!account?.isDriver) throw new Error('Only drivers can accept rides')
    const ride = await this.rideRepository.getById(input.rideId);
    if (!ride) throw new Error("Ride not found")
    ride.accept(input.driverId)
    await this.rideRepository.update(ride);
  }
}
