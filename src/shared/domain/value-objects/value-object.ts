
export default abstract class ValueObject<Value = any> {
  protected _value: Value;

  constructor(value: Value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  public toString(): Value {
    return this.value;
  }

  public equals(vo: ValueObject<Value>): boolean {
    return this.toString() === vo.toString();
  }
}
