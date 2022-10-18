import {
  SearchableRepositoryInterface,
  SearchParams,
  SearchProps,
  SearchResult,
} from "../../../shared/domain/repository/repository-contracts";
import { Category } from "../entities/category";

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {
  constructor(props: SearchProps<CategoryFilter> = {}) {
    props.sort = props.sort || 'created_at';
    super(props);
  }
}
export class CategorySearchResult extends SearchResult<
  Category,
  CategoryFilter
> {}

export interface CategoryRepository
  extends SearchableRepositoryInterface<
    Category,
    CategoryFilter,
    CategorySearchResult,
    CategorySearchParams
  > {}
