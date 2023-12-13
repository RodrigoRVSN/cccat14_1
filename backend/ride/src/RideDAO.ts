export interface RideDAO {
  save: (account: any) => Promise<void>
  getById: (rideId: string) => Promise<any>
  getActiveRideByPassengerId: (passengerId: string) => Promise<any>
  update: (ride: any) => Promise<void>
}
