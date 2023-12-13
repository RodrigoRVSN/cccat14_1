import Ride from "./Ride"

export interface RideRepository {
  save: (ride: Ride) => Promise<void>
  update: (ride: Ride) => Promise<void>
  getById: (rideId: string) => Promise<Ride | undefined>
  getActiveRideByPassengerId: (passengerId: string) => Promise<Ride | undefined>
}
