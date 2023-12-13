import { RideDAO } from "./RideDAO";
import { AccountRepository } from "./AccountRepository";

export class StartRide {
  constructor(private rideDAO: RideDAO, private AccountRepository: AccountRepository) { }

  async execute(input: any) {
    const ride = await this.rideDAO.getById(input.rideId);
    ride.status = "in_progress";
    await this.rideDAO.update(ride);
  }
}
