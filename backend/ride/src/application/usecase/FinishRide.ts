import { RideRepository } from "../repository/RideRepository";

type Input = {
  rideId: string;
};

export class FinishRide {
  constructor(private rideRepository: RideRepository) { }

  async execute(input: Input) {
    const ride = await this.rideRepository.getById(input.rideId);
    if (!ride) throw new Error("Ride not found");
    if (ride.getStatus() !== "in_progress")
      throw new Error("To update position ride must be in progress");
    ride.finish();
    await this.rideRepository.update(ride);
  }
}
