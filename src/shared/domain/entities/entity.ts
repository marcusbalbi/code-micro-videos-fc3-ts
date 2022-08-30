import UniqueEntityId from "../value-objects/unique-entity-id";
import { cloneDeep } from "lodash";

export default abstract class Entity {
  protected id: UniqueEntityId;
  constructor() {
    this.id = new UniqueEntityId();
  }

  getRawId(): UniqueEntityId {
    return this.id;
  }

  getId(): string {
    return this.id.toString();
  }

  toJSON() {
    const obj = cloneDeep(this) as any;
    obj.id = this.getId();
    return obj;
  }

  serialize(): string {
    const obj = cloneDeep(this) as any;
    obj.id = this.getId();
    return JSON.stringify(obj);
  }
}
