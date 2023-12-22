export class CarPlate {
  constructor(readonly value: string) {
    if (value && this.isInvalidCarPlate(value)) throw new Error("Invalid car plate");
  }

  isInvalidCarPlate = (value: string) => !value.match(/[A-Z]{3}[0-9]{4}/);
}
