import ValueObject from "../value-object";

class Stub extends ValueObject {}

describe("Value Object tests", () => {
  it("should have a get value", () => {
    const c = new Stub("a");
    expect(c.value).toBe("a")
  });
  it("should be comparable", () => {
    const c = new Stub("a");
    const d = new Stub(c.toString());
    expect(c.equals(d)).toBeTruthy();
  });
  it('should work with an object', () => {
    const c = new Stub({ a: 'b' });
    expect(c.value).toEqual({ a: "b" });
  })
});
