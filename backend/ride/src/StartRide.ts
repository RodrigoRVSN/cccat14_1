import { RideDAO } from "./RideDAO";
import { AccountDAO } from "./AccountDAO";

export class StartRide {
  constructor(private rideDAO: RideDAO, private accountDAO: AccountDAO) { }

  async execute(input: any) {
    const ride = await this.rideDAO.getById(input.rideId);
    ride.status = "in_progress";
    await this.rideDAO.update(ride);
  }
}
