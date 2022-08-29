import InvalidUiidError from "../../errors/invalid-uuid-error";
import { v4, validate as uuidValidate } from "uuid";
import ValueObject from "./value-object";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(id: string | null = null) {
    super( id ?? v4());
    this.validate();
  }

  private validate(): void {
    const isValid = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUiidError();
    }
  }
}
