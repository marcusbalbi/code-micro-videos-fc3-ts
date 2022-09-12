import ValidationError from "shared/errors/validation-error";

export default class ValidatorRules {
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  required(): ValidatorRules {
    if (this.value === null || this.value === undefined || this.value === "") {
      throw new ValidationError(`The ${ this.property } is required`);
    }
    return this;
  }

  string(): ValidatorRules {
    if (typeof this.value !== "string") {
      throw new ValidationError(`The ${ this.property } must be a string`);
    }
    return this;
  }

  maxLength(value: number): ValidatorRules {
    if (this.value.length > value) {
      throw new ValidationError(`The ${this.property} must be less or equal than  ${ value } chars`);
    }
    return this;
  }
}

ValidatorRules.values("123", "id").required().string().maxLength(20);
