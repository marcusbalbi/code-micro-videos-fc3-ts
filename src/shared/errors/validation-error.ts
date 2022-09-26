import { FieldsErrors } from "shared/validators/validator-fields.interface";

export class ValidationError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ValidatorError";
  }
}

export class EntityValidationError extends Error {
  constructor(public readonly errors: FieldsErrors) {
    super('Entity Validation Error');
    this.name = "EntityValidationError";
  }
}
