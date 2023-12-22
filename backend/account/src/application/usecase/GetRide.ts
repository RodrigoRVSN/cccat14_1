import { Logger } from "../logger/Logger";
import { RideRepository } from "../repository/RideRepository";

type Output = {
  rideId: string,
  status: string,
  driverId: string,
  passengerId: string,
  distance?: number,
  fare?: number
}

export class GetRide {
  constructor(private rideRepository: RideRepository, private logger: Logger) { }

  async execute(rideId: string): Promise<Output> {
    this.logger.log('getRide');
    const ride = await this.rideRepository.getById(rideId)
    console.log({ ride })
    if (!ride) throw new Error("Ride not found");
    return {
      driverId: ride.getDriverId(),
      rideId: ride.rideId,
      status: ride.getStatus(),
      passengerId: ride.passengerId,
      distance: ride.getDistance(),
      fare: ride.getFare()
    }
  }
}
