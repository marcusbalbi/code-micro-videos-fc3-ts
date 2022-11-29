import { Entity } from "../../entities";
import { UniqueEntityId } from "../../value-objects";
import { InMemoryRepository } from "../in-memory.repository";

type StubProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemory Repository unit tests", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  test("insert new entity", async () => {
    const entity = new StubEntity({ name: "teste", price: 22 });
    await repository.insert(entity);
    expect(repository.items.length).toBe(1);
    expect(repository.items[0].toJSON()).toEqual(entity.toJSON());
  });

  test("throw error when entity not found", async () => {
    await expect(repository.findById("aaa")).rejects.toThrow(
      `Entity not found using ID: aaa`
    );
    await expect(repository.findById(new UniqueEntityId())).rejects.toThrow(
      `Entity not found using ID:`
    );
  });

  test("should find by id", async () => {
    const entity = new StubEntity({ name: "teste", price: 22 });
    await repository.insert(entity);

    const itemFound = await repository.findById(entity.id);
    expect(itemFound.toJSON()).toEqual(entity.toJSON());
    const itemFoundWithUniqueId = await repository.findById(entity._id);
    expect(itemFoundWithUniqueId.toJSON()).toEqual(entity.toJSON());
  });

  test("should return all entities", async () => {
    const entity = new StubEntity({ name: "teste", price: 22 });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities.length).toBe(1);
    expect(entities).toStrictEqual([entity]);
  });

  test("throw error when update with entity not found", async () => {
    const entity = new StubEntity({ name: "teste", price: 22 });
    expect(repository.update(entity)).rejects.toThrow(
      `Entity not found using ID: ${entity.id}`
    );
  });

  test("update entity", async () => {
    const entity = new StubEntity({ name: "teste", price: 22 });
    await repository.insert(entity);

    const updatedEntity = new StubEntity(
      { name: "updated entity", price: 10 },
      entity._id
    );

    await repository.update(updatedEntity);
    expect(repository.items[0].toJSON()).toEqual(updatedEntity.toJSON());
  });

  test("throw error when delete with entity not found", async () => {
    expect(repository.delete("aaa")).rejects.toThrow(
      `Entity not found using ID: aaa`
    );
    expect(repository.findById(new UniqueEntityId())).rejects.toThrow(
      `Entity not found using ID:`
    );
  });

  test("delete entity", async () => {
    const entity = new StubEntity({ name: "teste", price: 22 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items.length).toBe(0);

    await repository.insert(entity);
    await repository.delete(entity._id);
    expect(repository.items.length).toBe(0);
  });
});
