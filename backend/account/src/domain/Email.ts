export class Email {
  constructor(readonly value: string) {
    if (this.isInvalidEmail(value)) throw new Error("Invalid email");
  }

  isInvalidEmail = (value: string) => !value.match(/^(.+)@(.+)$/);
}