import { ModelFactory, Model } from "./model-factory";
import crypto from 'crypto';

class StubModel implements Model {
  bulkCreate (data: any[]) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.map(d => {
          const m = new StubModel();
          m.id = d.id;
          m.name = d.name;
          return m;
        }));
      }, 100);
    });
  };
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

  test('bulk create', async () => {
    const stub = new StubModel();
    const spyModel = jest.spyOn(stub, "bulkCreate");
    const factoryProps = jest.fn(() => ({
      id: crypto.randomUUID(),
      name: "testtest".concat(crypto.randomBytes(5).toString('hex')),
    }));
    const factory = new ModelFactory(stub, factoryProps);
    const models = await factory.count(10).bulkCreate();
    expect(factoryProps).toHaveBeenCalledTimes(10);
    expect(models.length).toBe(10)
    expect(spyModel).toHaveBeenCalled();
  })
  test('bulk create no count', async () => {
    const stub = new StubModel();
    const spyModel = jest.spyOn(stub, "bulkCreate");
    const factoryProps = jest.fn(() => ({
      id: crypto.randomUUID(),
      name: "testtest".concat(crypto.randomBytes(5).toString('hex')),
    }));
    const factory = new ModelFactory(stub, factoryProps);
    const models = await factory.bulkCreate();
    expect(factoryProps).toHaveBeenCalledTimes(1);
    expect(models.length).toBe(1)
    expect(spyModel).toHaveBeenCalled();
  })
});
