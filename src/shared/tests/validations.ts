import { FieldsErrors } from "../validators/validator-fields.interface";
import { ClassValidatorField } from "../validators/class-validator-fields";
import expectImport from "expect";
import { EntityValidationError } from "../errors/validation-error";

type Expected =
  | {
      validator: ClassValidatorField<any>;
      data: any;
    }
  | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        return validValidation();
      } catch (e) {
        const error = e as EntityValidationError;
        return invalidValidation(received, error.errors);
      }
    } else {
      const { validator, data } = expected;

      const isValid = validator.validate(data);

      if (isValid) {
        return validValidation();
      }

      return invalidValidation(received, validator.errors);
    }
  },
});

const validValidation = () => {
  return {
    pass: false,
    message: () => `The data is valid`,
  };
};

const invalidValidation = (received: FieldsErrors, errors: FieldsErrors) => {
  const isMatch = expectImport
    .objectContaining(received)
    .asymmetricMatch(errors);

  if (isMatch) {
    return { pass: true, message: () => "" };
  }

  const jsonReceibed = JSON.stringify(received);
  const jsonErrors = JSON.stringify(errors);

  return {
    pass: false,
    message: () =>
      `The Validation erros not contains ${jsonReceibed}. Current: ${jsonErrors}`,
  };
};
