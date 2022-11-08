import { SearchResult } from "#core/shared/domain/repository/repository-contracts";
import { PaginationOutputMapper } from "./pagination-output.dto";

describe("Pagination output Dto unit test", () => {

  test("paginationOutputMapper convert output", () => {
    const searchResult = new SearchResult({
      items: [],
      current_page: 1,
      filter: null,
      per_page: 1,
      sort: null,
      sort_dir: null,
      total: 2
    })
    const result = PaginationOutputMapper.toOutput(searchResult);

    expect(result).toStrictEqual({
      current_page: 1,
      per_page: 1,
      last_page: 2,
      total: 2,
    });

  });
});