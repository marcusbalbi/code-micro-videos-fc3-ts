import { ComplexValueObject, SimpleValueObject, ValueObject } from "../value-object";

class SimpleStub extends SimpleValueObject {}
class ComplexStub extends ComplexValueObject {}

interface Address {
  street: string;
  city: string;
}
class AddComplexStub extends ValueObject<Address> {
  public toString(): string {
    return JSON.stringify(this._value);
  }
}

describe("Value Object tests", () => {
  it("should have a get value", () => {
    const c = new SimpleStub("a");
    expect(c.value).toBe("a")
  });
  it("should be comparable", () => {
    const c = new SimpleStub("a");
    const d = new SimpleStub(c.toString());
    expect(c.equals(d)).toBeTruthy();
  });
  it('should work with an object', () => {
    const c = new ComplexStub({ a: "b" });
    expect(c.value).toEqual({ a: "b" });
  })
  it('should work with a Date', () => {
    const d1 = new Date();
    const c = new ComplexStub(d1);
    expect(c.value).toEqual(d1);
  })
  it('should work with an interface/type', () => {
    const c = new AddComplexStub({ city: "Rio de Janeiro", street: "Concordia"});
    expect(c.value).toEqual({ city: "Rio de Janeiro", street: "Concordia" });
  })
});
