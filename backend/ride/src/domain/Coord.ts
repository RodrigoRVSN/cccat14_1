export class Coord {
  constructor(readonly lat: number, readonly long: number) {
    if (lat < -90 || lat > 90) throw new Error("Invalid latitude")
    if (long < -180 || lat > 180) throw new Error("Invalid longitude")
  }
}