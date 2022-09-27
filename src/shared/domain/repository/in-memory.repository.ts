import Entity from "../entities/entity";
import uniqueEntityId from "../value-objects/unique-entity-id";
import { RepositoryInterface } from "./repository-contracts";

export default abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async findById(id: string | uniqueEntityId): Promise<E> {
    const item = this.items.find((e) => e.id === id);

    if (!item) { throw new Error("Entity not found"); }

    return item;
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
  async update(entity: E): Promise<void> {}
  async delete(id: string | uniqueEntityId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
