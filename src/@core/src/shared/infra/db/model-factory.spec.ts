import { ModelFactory, Model } from "./model-factory";

class StubModel implements Model {
  public id;
  public name;
  async create(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.id = data.id;
        this.name = data.name;
        resolve(null);
      }, 100);
    });
  }
  build(data) {
    this.id = data.id;
    this.name = data.name;
  }
}

describe("ModelFactory", () => {
  test("create", async () => {
    const stub = new StubModel();
    const spyModel = jest.spyOn(stub, "create");
    const factoryProps = jest.fn(() => ({
      id: "aa-bb",
      name: "test",
    }));
    const factory = new ModelFactory(stub, factoryProps);
    await factory.create();
    expect(factoryProps).toHaveBeenCalled();
    expect(spyModel).toHaveBeenCalled();
    expect(stub.id).toBe("aa-bb");
    expect(stub.name).toBe("test");

    const data = { id: "bb-cc", name: "aaa" };
    await factory.create(data);
    expect(spyModel).toHaveBeenCalledWith(data);
    expect(factoryProps).not.toHaveBeenCalledTimes(2);
    expect(stub.id).toBe(data.id);
    expect(stub.name).toBe(data.name);
  });

  test("make", () => {
    const stub = new StubModel();
    const spyModel = jest.spyOn(stub, "build");
    const factoryProps = jest.fn(() => ({
      id: "aa-bb",
      name: "test",
    }));
    const factory = new ModelFactory(stub, factoryProps);
    factory.make();
    expect(factoryProps).toHaveBeenCalled();
    expect(spyModel).toHaveBeenCalled();
    expect(stub.id).toBe("aa-bb");
    expect(stub.name).toBe("test");

    const data = { id: "bb-cc", name: "aaa" };
    factory.make(data);
    expect(spyModel).toHaveBeenCalledWith(data);
    expect(factoryProps).not.toHaveBeenCalledTimes(2);
    expect(stub.id).toBe(data.id);
    expect(stub.name).toBe(data.name);
  });
});
