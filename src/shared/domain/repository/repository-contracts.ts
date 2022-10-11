import Entity from "../entities/entity";
import UniqueEntityId from "../value-objects/unique-entity-id";

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = "asc" | "desc";

export type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams {
  protected _page: number;
  protected _per_page: number = 15;
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: string;
  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    const _page = parseInt(`${value}`);
    if (isNaN(_page) || _page <= 0) {
      this._page = 1;
    } else {
      this._page = _page;
    }
  }

  get per_page() {
    return this._per_page;
  }

  private set per_page(value: number) {
    const _per_page = parseInt(`${value}`);
    if (isNaN(_per_page) || _per_page <= 0) {
      this._per_page = 15;
    } else {
      this._per_page = _per_page;
    }
  }

  get sort() {
    return this._sort;
  }

  private set sort(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this._sort = null;
    } else {
      this._sort = `${value}`;
    }
  }

  get sort_dir() {
    return this._sort_dir;
  }

  private set sort_dir(value: string | null) {
    if (!this.sort) {
      this._sort_dir = null;
      return;
    }
    const dir = `${ value }`.toLowerCase();
    this._sort_dir = (['asc', 'desc'].includes(dir) ? dir : 'asc') as SortDirection
  }

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this._filter = null;
    } else {
      this._filter = `${value}`;
    }
  }
}

export class Search {}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchOutput,
  SearchInput = SearchParams
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
