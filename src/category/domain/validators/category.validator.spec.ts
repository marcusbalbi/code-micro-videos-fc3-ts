import { Category } from "../entities/category";
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
    let isValid = validator.validate({} as any);
    expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);

    isValid = validator.validate({ name: "" });
    expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
    ]);

    isValid = validator.validate({ name: 5 as any });
    expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);

    isValid = validator.validate({ name: "teste".repeat(52) });
    expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name must be shorter than or equal to 255 characters",
    ]);
  });

  test("valid cases for fields", () => {
    expect(validator.validate({ name: "teste" })).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(
      new CategoryRules({ name: "teste" })
    );

    expect(
      validator.validate({ name: "teste", description: undefined })
    ).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new CategoryRules({
      name: "teste",
      description: undefined,
    }));

    expect(
      validator.validate({ name: "teste", description: null })
    ).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new CategoryRules({
      name: "teste",
      description: null,
    }));

    expect(validator.validate({ name: "teste", is_active: true })).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new CategoryRules({
      name: "teste",
      is_active: true,
    }));

    expect(
      validator.validate({ name: "teste", is_active: false })
    ).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new CategoryRules({
      name: "teste",
      is_active: false,
    }));
  });
});
