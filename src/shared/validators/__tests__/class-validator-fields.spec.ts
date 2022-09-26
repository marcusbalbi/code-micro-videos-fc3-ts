import { ClassValidatorField } from "../class-validator-fields";
import * as libClassValidator from "class-validator";
class ClassValidatorFieldsStub extends ClassValidatorField<{ field: string }> {}

describe("Class Validator Fields unit tests", () => {
  test("errors and validatedData should be empty", () => {
    const stubValidator = new ClassValidatorFieldsStub();
    expect(stubValidator.errors).toStrictEqual({});
    expect(stubValidator.validatedData).toBe(null);
  });

  test("validate with errors", () => {
    const spy = jest.spyOn(libClassValidator, "validateSync");
    spy.mockReturnValue([
      { property: "field", constraints: { isRequired: "Required" } },
    ]);
    const stubValidator = new ClassValidatorFieldsStub();
    expect(stubValidator.validate({})).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(stubValidator.validatedData).toBeNull();
    expect(stubValidator.errors).toStrictEqual({ field: ["Required"] });
    spy.mockClear();
  });
  test("validate without errors", () => {
    const spy = jest.spyOn(libClassValidator, "validateSync");
    spy.mockReturnValue([]);
    const stubValidator = new ClassValidatorFieldsStub();
    expect(stubValidator.validate({ field: 'a'})).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(stubValidator.validatedData).toStrictEqual({ field: "a" });
    expect(stubValidator.errors).toStrictEqual({});
    spy.mockClear();
  });
});
