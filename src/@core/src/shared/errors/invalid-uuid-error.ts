export class InvalidUiidError extends Error {
  constructor() {
    super("ID must be a valid UUID");
    this.name = "InvalidUiidError";
  }
}
