import { SearchResult } from "shared/domain/repository/repository-contracts";

export type PaginationOutputDto<Items = any> = {
  items: Items[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
};

export class PaginationOutputMapper {
  static toPaginationOutput(searchResult: SearchResult): Omit<PaginationOutputDto, 'items'> {
    return {
      current_page: searchResult.current_page,
      last_page: searchResult.last_page,
      per_page: searchResult.per_page,
      total: searchResult.total,
    };
  }
}
