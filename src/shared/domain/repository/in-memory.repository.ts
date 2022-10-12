import NotFoundError from "../../errors/not-found-error";
import Entity from "../entities/entity";
import uniqueEntityId from "../value-objects/unique-entity-id";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
} from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity>
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
    const _id = `${id}`;
    const item = this.items.find((e) => e.id === _id);
    if (!item) {
      throw new NotFoundError(`Entity not found using ID: ${_id}`);
    }

    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = [];
  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir
    );
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page
    );
    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>;
  protected async applySort(
    items: E[],
    sort: string | null,
    sort_dir: string | null
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }
    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_dir === 'asc' ? -1 : 1;
      }

      if (a.props[sort] > b.props[sort]) {
        return sort_dir === 'asc' ? 1 : -1;
      }

      return 0;
    })
  }
  protected abstract applyPaginate(
    items: E[],
    page: SearchParams["page"],
    per_page: SearchParams["per_page"]
  ): Promise<E[]>;
}
