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

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this._sort = null;
    } else {
      this._sort = `${value}`;
    }
  }

  get sort_dir(): string | null {
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

  get filter(): string | null {
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

type SearchResultProps<E extends Entity,Filter> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  sort: string | null;
  sort_dir: string | null;
  filter: Filter;
};
export class SearchResult<E extends Entity,Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort: string | null;
  readonly sort_dir: string | null;
  readonly filter: Filter | null;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
    this.last_page = Math.ceil(this.total / this.per_page)
  }

  toJSON () {
    return {
      items: this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      sort: this.sort,
      sort_dir: this.sort_dir,
      filter: this.filter,
      last_page: Math.ceil(this.total / this.per_page),
    }
  }

}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchOutput =  SearchResult<E, Filter>,
  SearchInput = SearchParams
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
