import { FieldsErrors } from "../validators/validator-fields.interface";

export class LoadEntityError extends Error {
  constructor(public errors: FieldsErrors, message?: string) {
    super(message?? 'Entity not loaded');
    this.name = "LoadEntityError";
  }
}