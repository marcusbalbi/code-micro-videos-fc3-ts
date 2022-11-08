import { ValidatorRules } from "../validator-rules";

type ExpectedValidationRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error?: string;
  params?: any[];
};

function assertIsInvalid({
  value,
  property,
  rule,
  error,
  params = [],
}: ExpectedValidationRule) {
  expect(() => {
    //@ts-ignore
    ValidatorRules.values(value, property)[rule](...params);
  }).toThrow(error);
}

function assertIsValid({
  value,
  property,
  rule,
  params = [],
}: ExpectedValidationRule) {
  expect(() => {
    //@ts-ignore
    ValidatorRules.values(value, property)[rule](...params);
  }).not.toThrow();
}

describe("validator rules Unit tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("some value", "field1");

    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field1");
  });

  test("required validation rule", () => {
    const arrange: ExpectedValidationRule[] = [
      {
        value: null,
        property: "field1",
        error: "is required",
        rule: "required",
      },
      {
        value: undefined,
        property: "field1",
        error: "is required",
        rule: "required",
      },
      { value: "", property: "field1", error: "is required", rule: "required" },
    ];
    for (const item of arrange) {
      assertIsInvalid(item);
    }
    expect(() => {
      ValidatorRules.values("some value", "field1").required();
    }).not.toThrow();

    const arrangeValid: ExpectedValidationRule[] = [
      { value: "some value", property: "field1", rule: "required" },
      { value: 2, property: "field1", rule: "required" },
      { value: false, property: "field1", rule: "required" },
    ];
    for (const item of arrangeValid) {
      assertIsValid(item);
    }
  });

  test("string validation rule", () => {
    const arrange: ExpectedValidationRule[] = [
      {
        value: 5,
        property: "field1",
        error: "must be a string",
        rule: "string",
      },
      {
        value: {},
        property: "field1",
        error: "must be a string",
        rule: "string",
      },
      {
        value: false,
        property: "field1",
        error: "must be a string",
        rule: "string",
      },
    ];
    for (const item of arrange) {
      assertIsInvalid(item);
    }
    expect(() => {
      ValidatorRules.values("some value", "field1").required();
    }).not.toThrow();

    const arrangeValid: ExpectedValidationRule[] = [
      { value: "some value", property: "field1", rule: "string" },
      { value: "", property: "field1", rule: "string" },
      { value: null, property: "field1", rule: "string" },
      { value: undefined, property: "field1", rule: "string" },
    ];
    for (const item of arrangeValid) {
      assertIsValid(item);
    }
  });

  test("test maxLength", () => {
    const arrange: ExpectedValidationRule[] = [
      {
        value: "aa",
        property: "field1",
        error: " must be less or equal than ",
        rule: "maxLength",
        params: [1],
      },
    ];
    for (const item of arrange) {
      assertIsInvalid(item);
    }
    expect(() => {
      ValidatorRules.values("some value", "field1").required();
    }).not.toThrow();

    const arrangeValid: ExpectedValidationRule[] = [
      { value: "min 10", property: "field1", rule: "maxLength", params: [10] },
      { value: "aa", property: "field1", rule: "maxLength", params: [2] },
      { value: null, property: "field1", rule: "maxLength", params: [2] },
      { value: undefined, property: "field1", rule: "maxLength", params: [2] },
    ];
    for (const item of arrangeValid) {
      assertIsValid(item);
    }
  });

  test("boolean validation rule", () => {
    const arrange: ExpectedValidationRule[] = [
      {
        value: 5,
        property: "field1",
        error: "must be a boolean",
        rule: "bool",
      },
      {
        value: {},
        property: "field1",
        error: "must be a boolean",
        rule: "bool",
      },
      {
        value: "",
        property: "field1",
        error: "must be a boolean",
        rule: "bool",
      },
    ];
    for (const item of arrange) {
      assertIsInvalid(item);
    }
    expect(() => {
      ValidatorRules.values("some value", "field1").required();
    }).not.toThrow();

    const arrangeValid: ExpectedValidationRule[] = [
      { value: true, property: "field1", rule: "bool" },
      { value: false, property: "field1", rule: "bool" },
      { value: null, property: "field1", rule: "bool" },
      { value: undefined, property: "field1", rule: "bool" },
    ];
    for (const item of arrangeValid) {
      assertIsValid(item);
    }
  });

  test("combine two or more validation rules", () => {
    let validator = ValidatorRules.values(null, "field");
    expect(() => {
      validator.required().string();
    }).toThrow("required");

    validator = ValidatorRules.values(5, "field");
    expect(() => {
      validator.required().string();
    }).toThrow("must be a string");

    validator = ValidatorRules.values("112", "field");
    expect(() => {
      validator.required().string().maxLength(2);
    }).toThrow("must be less or equal");

    validator = ValidatorRules.values(null, "field");
    expect(() => {
      validator.required().bool();
    }).toThrow("required");

    validator = ValidatorRules.values("false", "field");
    expect(() => {
      validator.required().bool();
    }).toThrow("must be a boolean");
  });

  it("valid combined rules", () => {
    let validator = ValidatorRules.values("valid string", "field");
    expect(() => {
      validator.required().string();
    }).not.toThrow();

    validator = ValidatorRules.values("text", "field");
    expect(() => {
      validator.required().string().maxLength(5);
    }).not.toThrow();

    validator = ValidatorRules.values(true, "field");
    expect(() => {
      validator.required().bool();
    }).not.toThrow();
  });
});
