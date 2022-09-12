export default class ValidationError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ValidatorError";
  }
}
