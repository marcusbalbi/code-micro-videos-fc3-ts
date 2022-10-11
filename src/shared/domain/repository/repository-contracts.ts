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
    this._page = props.page;
    this._per_page = props.per_page;
    this._sort = props.sort;
    this._sort_dir = props.sort_dir;
    this._filter = props.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    const _page = parseInt(value.toString());
    if (isNaN(_page) || _page <= 0) {
      this._page = 1;
    }
    this._page = value;
  }

  get per_page() {
    return this._per_page;
  }

  private set per_page(value: number) {
    const _per_page = parseInt(value.toString());
    if (isNaN(_per_page) || _per_page <= 0) {
      this._per_page = 15;
    }
    this._per_page = value;
  }

  get sort() {
    return this._sort;
  }

  private set sort(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this._sort = null;
    }
    this._sort = `${value}`;
  }

  get sort_dir() {
    return this._sort_dir;
  }

  private set sort_dir(value: string | null) {
    if (!value || !["asc", "desc"].includes(value.toLowerCase())) {
      this._sort_dir = "asc";
    }
    this.sort_dir = `${value}`.toLowerCase();
  }

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this._filter = null;
    }
    this._filter = `${value}`;
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
