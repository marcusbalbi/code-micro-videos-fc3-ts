import { FieldsErrors } from "../validators/validator-fields.interface";
import { ClassValidatorField } from "../validators/class-validator-fields";
import expectImport from "expect";

type Expected = {
  validator: ClassValidatorField<any>;
  data: any;
};

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    const { validator, data } = expected;

    const isValid = validator.validate(data);

    if (isValid) {
      return {
        pass: false,
        message: () => `The data is valid`,
      };
    }

    const isMatch = expectImport
      .objectContaining(received)
      .asymmetricMatch(validator.errors);

    if (isMatch) {
      return { pass: true, message: () => "" };
    }

    const jsonReceibed = JSON.stringify(received);
    const jsonErrors = JSON.stringify(expected.validator.errors);

    return {
      pass: false,
      message: () =>
        `The Validation erros not contains ${jsonReceibed}. Current: ${jsonErrors}`,
    };
  },
});
