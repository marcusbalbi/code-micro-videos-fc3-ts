import Entity from "../entities/entity";
import UniqueEntityId from "../value-objects/unique-entity-id";
import InMemoryRepository from "./in-memory.repository";

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
  })

  test("insert new entity", async () => {
    const entity = new StubEntity({ name: "teste", price: 22 });
    await repository.insert(entity);
    expect(repository.items.length).toBe(1);
    expect(repository.items[0].toJSON()).toEqual(entity.toJSON());
  });

  test('throw error when entity not found', async () => {
    expect(repository.findById('aaa')).rejects.toThrow(`Entity not found using ID: aaa`)
    expect(repository.findById(new UniqueEntityId())).rejects.toThrow(`Entity not found using ID:`)
  })
});
