import UniqueEntityId from "../value-objects/unique-entity-id";
import { cloneDeep } from "lodash";

export default abstract class Entity<T> {
  protected _id: UniqueEntityId;
  protected props: T;
  constructor(props: T, id?: UniqueEntityId) {
    this._id = id || new UniqueEntityId();
    this.props = props;
  }

  getRawId(): UniqueEntityId {
    return this._id;
  }

  get id(): string {
    return this._id.toString();
  }

  toJSON() {
    return this.props;
  }

  serialize(): string {
    const obj = cloneDeep(this.props) as any;
    obj.id = this.id;
    return JSON.stringify(obj);
  }
}
