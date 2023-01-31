import {
  CategoryRules,
  CategoryValidator,
  CategoryValidatorFactory,
} from "./category.validator";

describe("Category Validator tests", () => {
  let validator: CategoryValidator;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });

  test("invalidation cases for name field", () => {
    expect({ validator, data: {} }).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({ validator, data: { name: "" } }).containsErrorMessages({
      name: ["name should not be empty"],
    });
    expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({
      validator,
      data: { name: "teste".repeat(52) },
    }).containsErrorMessages({
      name: ["name must be shorter than or equal to 255 characters"],
    });
  });

  test("invalidation cases for description field", () => {
    expect({
      validator,
      data: { name: "valid name", description: 5 },
    }).containsErrorMessages({
      description: ["description must be a string"],
    });

    expect({
      validator,
      data: { name: "valid name", description: true },
    }).containsErrorMessages({
      description: ["description must be a string"],
    });
  });

  test("invalidation cases for is_active field", () => {
    expect({
      validator,
      data: { name: "valid name", is_active: 5 },
    }).containsErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });

    expect({
      validator,
      data: { name: "valid name", is_active: 0 },
    }).containsErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });
    expect({
      validator,
      data: { name: "valid name", is_active: 1 },
    }).containsErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });
    expect({
      validator,
      data: { name: "valid name", is_active: "true" },
    }).containsErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });
  });

  describe("valid cases for fields", () => {
    const arrange = [
      { name: "teste" },
      { name: "teste", description: undefined as any },
      { name: "teste", description: null },
      { name: "teste", is_active: true },
      { name: "teste", is_active: false },
    ];

    test.each(arrange)("validate %o", (item) => {
      expect(validator.validate(item)).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new CategoryRules(item));
    })
  });
});
