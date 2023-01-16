import { ModelFactory, Model } from "./model-factory";

class StubModel implements Model {
  public id;
  public name;
  create(data) {
    this.id = data.id;
    this.name = data.name;
  };
}

describe('ModelFactory', () => {
  test('create', () => {
    const stub = new StubModel();
    const spyModel = jest.spyOn(stub, 'create');
    const factoryProps = jest.fn(() => ({
      id: 'aa-bb',
      name: 'test'
    }));
    const factory = new ModelFactory(stub, factoryProps);
    factory.create();
    expect(factoryProps).toHaveBeenCalled();
    expect(spyModel).toHaveBeenCalled();
    expect(stub.id).toBe('aa-bb')
    expect(stub.name).toBe('test')

    const data = { id: "bb-cc", name: "aaa" };
    factory.create(data);
    expect(spyModel).toHaveBeenCalledWith(data);
    expect(factoryProps).not.toHaveBeenCalledTimes(2);
    expect(stub.id).toBe(data.id);
    expect(stub.name).toBe(data.name);
  })
});