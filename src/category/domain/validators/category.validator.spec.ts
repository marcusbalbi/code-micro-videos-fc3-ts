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
    //@ts-ignore
    expect({ validator, data: {} }).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });
    //let isValid = validator.validate({} as any);
    // expect(isValid).toBeFalsy();
    // expect(validator.errors["name"]).toStrictEqual([
    //   "name should not be empty",
    //   "name must be a string",
    //   "name must be shorter than or equal to 255 characters",
    // ]);

    // isValid = validator.validate({ name: "" });
    // expect(isValid).toBeFalsy();
    // expect(validator.errors["name"]).toStrictEqual([
    //   "name should not be empty",
    // ]);

    // isValid = validator.validate({ name: 5 as any });
    // expect(isValid).toBeFalsy();
    // expect(validator.errors["name"]).toStrictEqual([
    //   "name must be a string",
    //   "name must be shorter than or equal to 255 characters",
    // ]);

    // isValid = validator.validate({ name: "teste".repeat(52) });
    // expect(isValid).toBeFalsy();
    // expect(validator.errors["name"]).toStrictEqual([
    //   "name must be shorter than or equal to 255 characters",
    // ]);
  });

  test("valid cases for fields", () => {

    const arrange = [
      { name: "teste" },
      { name: "teste", description: undefined as any },
      { name: "teste", description: null },
      { name: "teste", is_active: true },
      { name: "teste", is_active: false },
    ];

    for(const item of arrange) {
      expect(validator.validate(item)).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(
        new CategoryRules(item)
      );

    }
  });
});
