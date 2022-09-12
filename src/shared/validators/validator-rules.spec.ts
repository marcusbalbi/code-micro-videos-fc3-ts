import ValidatorRules from "./validator-rules";

describe("validator rules Unit tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("some value", "field1");

    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field1");
  });

  test("required validation rule", () => {
    const arrange = [
      { value: null, property: "field1", messageErr: "is required" },
      { value: undefined, property: "field1", messageErr: "is required" },
      { value: "", property: "field1", messageErr: "is required" },
    ];
    for (const item of arrange) {
      expect(() => {
        ValidatorRules.values(item.value, item.property).required();
      }).toThrowError(item.messageErr);
    }
    expect(() => {
      ValidatorRules.values("some value", "field1").required();
    }).not.toThrow();

    const arrangeValid = [
      { value: "some value", property: "field1" },
      { value: 2, property: "field1" },
      { value: false, property: "field1" },
    ];
    for (const item of arrangeValid) {
      expect(() => {
        ValidatorRules.values(item.value, item.property).required();
      }).not.toThrow();
    }
  });
});
