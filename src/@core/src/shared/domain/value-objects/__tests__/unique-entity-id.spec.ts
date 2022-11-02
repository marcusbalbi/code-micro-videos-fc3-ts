import { InvalidUiidError } from "#core/shared/errors/invalid-uuid-error";
import { UniqueEntityId } from "../unique-entity-id";

describe("test unique-entity-id", () => {
  it("should throw error when uuid is invalid", () => {
    expect(() => {
      return new UniqueEntityId("invalid-uuid");
    }).toThrow(InvalidUiidError);
  });
  it("should call validate on new UniqueEntityId", () => {
    const validate = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const c = new UniqueEntityId();
    expect(validate).toHaveBeenCalled();
    expect(c.toString()).toBeDefined();
  });
  it("should accept a uuid passed in constructor", () => {
    const uuid = "bbbbc518-2bbf-4a5d-9e66-943ea410c230";
    const c = new UniqueEntityId(uuid);
    expect(c.toString()).toEqual(uuid)
  });
});
