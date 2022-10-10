import Entity from "../entities/entity";
import UniqueEntityId from "../value-objects/unique-entity-id";

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchParams,
  SearchResult
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchResult>;
}