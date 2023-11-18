export interface RideDAO {
  save: (account: any) => Promise<void>
  getById: (rideId: string) => Promise<any>
}
