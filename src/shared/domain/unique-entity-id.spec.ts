import InvalidUiidError from "../errors/invalid-uuid-error";
import UniqueEntityId from "./unique-entity-id";

describe('test unique-entity-id', () => {
  it('should throw error when uuid is invalid', () => {
    expect(() => {
      return new UniqueEntityId('invalid-uuid');
    }).toThrow(InvalidUiidError);
  });
  it("should call validate on new UniqueEntityId", () => {
    const validate = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const c = new UniqueEntityId();
    expect(validate).toHaveBeenCalled();
  });
})
