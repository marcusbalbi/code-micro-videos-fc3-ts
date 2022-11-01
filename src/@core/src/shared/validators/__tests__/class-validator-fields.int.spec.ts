import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { ClassValidatorField } from "../class-validator-fields";

class RulesStub {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

class ClassValidatorFieldsStub extends ClassValidatorField<RulesStub> {
  validate(data: any): boolean {
    return super.validate(new RulesStub(data));
  }
}

describe("ClassValidatorFields integration tests", () => {
  test("should validate with errors", () => {
    const validator = new ClassValidatorFieldsStub();

    expect(validator.validate({})).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
      price: [
        "price should not be empty",
        "price must be a number conforming to the specified constraints",
      ],
    });
  });

  test('should validate without errors', () => {
    const validator = new ClassValidatorFieldsStub();

    expect(validator.validate({ name: 'test', price: 2 })).toBeTruthy();
    expect(validator.errors).toStrictEqual({});
    expect(validator.validatedData).toStrictEqual(
      new RulesStub({ name: "test", price: 2 })
    );
  });
});
