import Entity from "../entities/entity";
import InMemoryRepository from "./in-memory.repository";

class StubEntity extends Entity<{ field1: string }> {


}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemory Repository unit tests", () => {
  test('insert', async () => {
    const entity = new StubEntity({ field1: 'teste' });
    const repository = new StubInMemoryRepository();
    await repository.insert(entity);
    expect(repository.items.length).toBe(1);
    expect(repository.items[0].id).toEqual(entity.id);
  });

  test('findById', async () => {
    const entity = new StubEntity({ field1: 'teste' });
    const repository = new StubInMemoryRepository();
    await repository.insert(entity);
    const item = await repository.findById(entity.id);
    expect(item).toBeDefined();

    const item2 = await repository.findById('new-ud');
    expect(item2).toBeNull();




  })
});