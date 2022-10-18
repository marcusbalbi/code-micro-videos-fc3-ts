import {
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
} from "../../../shared/domain/repository/repository-contracts";
import { Category } from "../entities/category";

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}
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
