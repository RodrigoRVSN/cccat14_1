import { Queue } from "../../infra/queue/Queue";
import { RideRepository } from "../repository/RideRepository";

type Input = {
  rideId: string;
};

export class FinishRide {
  constructor(
    private rideRepository: RideRepository,
    private queue: Queue
  ) { }

  async execute(input: Input) {
    const ride = await this.rideRepository.getById(input.rideId);
    if (!ride) throw new Error("Ride not found");
    if (ride.getStatus() !== "in_progress")
      throw new Error("To update position ride must be in progress");
    ride.finish();
    await this.rideRepository.update(ride);
    // await this.paymentGateway.processPayment({
    //   rideId: ride.rideId,
    //   amount: ride.getFare(),
    // });
    await this.queue.publish("rideCompleted", {
      rideId: ride.rideId,
      amount: ride.getFare(),
    })
  }
}
