import NotFoundError from "../../errors/not-found-error";
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
    return this._get(id);
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
  async update(entity: E): Promise<void> {
    const item = await this._get(entity.id);
    const idx = this.items.findIndex((e) => e.id === entity.id);
    this.items[idx] = entity;
  }
  async delete(id: string | uniqueEntityId): Promise<void> {
    const item = await this._get(id);
    const idx = this.items.findIndex((e) => e.id === item.id);
    this.items.splice(idx, 1);
  }

  protected async _get(id: string | uniqueEntityId): Promise<E> {
    const _id = `${ id }`
    const item = this.items.find((e) => e.id === _id);
    if (!item) {
      throw new NotFoundError(`Entity not found using ID: ${ _id }`);
    }

    return item;
  }
}
