import InvalidUiidError from "../errors/invalid-uuid-error";
import { v4, validate as uuidValidate } from "uuid";

export default class UniqueEntityId {
  private readonly id: string;
  constructor(id: string | null = null) {
    this.id = id ?? v4();
    this.validate();
  }

  private validate(): void {
    const isValid = uuidValidate(this.id);
    if (!isValid) {
      throw new InvalidUiidError();
    }
  }

  public toString(): string {
    return this.id;
  }

  public equals(id: UniqueEntityId) {
    return this.id.toString() === id.toString()
  }
}
