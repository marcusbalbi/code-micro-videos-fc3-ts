export abstract class ValueObject<Value> {
  protected _value: Value;

  constructor(value: Value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  public abstract toString(): string;

  public equals(vo: ValueObject<Value>): boolean {
    return this.toString() === vo.toString();
  }
}

export abstract class SimpleValueObject extends ValueObject<string> {
  public toString(): string {
    return this._value;
  }
}
export abstract class ComplexValueObject extends ValueObject<Object> {
  public toString(): string {
    return JSON.stringify(this._value);
  }
}
