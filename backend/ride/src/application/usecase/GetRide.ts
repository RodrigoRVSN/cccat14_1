import { Logger } from "../logger/Logger";
import { RideRepository } from "../repository/RideRepository";

export class GetRide {
  constructor(private rideRepository: RideRepository, private logger: Logger) { }

  async execute(rideId: string) {
    this.logger.log(`getRide`);
    const ride = await this.rideRepository.getById(rideId)
    return ride
  }
}
