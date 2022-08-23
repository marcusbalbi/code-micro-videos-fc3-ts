import InvalidUiidError from "shared/errors/invalid-uuid-error";
import { v4, validate as uuidValidate } from "uuid";

export default class UniqueEntityId {
  constructor(public readonly id: string) {
    this.id = id ?? v4();
    this.validate();
  }

  private validate(): void {
    const isValid = uuidValidate(this.id);
    if (!isValid) {
      throw new InvalidUiidError();
    }
  }
}
