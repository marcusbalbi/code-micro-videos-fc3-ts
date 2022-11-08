import {ValidationError} from "../../shared/errors/validation-error";


export class ValidatorRules {
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
    if (!isEmpty(this.value) && typeof this.value !== "string") {
      throw new ValidationError(`The ${ this.property } must be a string`);
    }
    return this;
  }

  maxLength(value: number): ValidatorRules {
    if (!isEmpty(this.value) && this.value.length > value) {
      throw new ValidationError(`The ${this.property} must be less or equal than  ${ value } chars`);
    }
    return this;
  }

  bool(): ValidatorRules {
    if(!isEmpty(this.value) && typeof this.value !== 'boolean') {
      throw new ValidationError(`The ${this.property} must be a boolean`);
    }
    return this;
  }
}

export function isEmpty(value: any) {
  return value === undefined || value === null;
}
