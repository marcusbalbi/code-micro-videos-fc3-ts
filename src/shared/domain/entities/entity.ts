import UniqueEntityId from "../value-objects/unique-entity-id";

export default abstract class Entity<T = any> {
  readonly _id: UniqueEntityId;
  public readonly props: T;
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

  toJSON(): Required<{ id: string } & T> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & T>;
  }

  serialize(): string {
    const obj = this.toJSON();
    return JSON.stringify(obj);
  }
}
