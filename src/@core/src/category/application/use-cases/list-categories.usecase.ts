import { CategoryRepository, CategorySearchParams, CategorySearchResult } from "#core/category/domain";
import { PaginationOutputDto, PaginationOutputMapper, SearchInputDto } from "#core/shared/application";
import UseCase from "#core/shared/application/use-case";
import { CategoryOutputDto, CategoryOutputMapper } from "../dto/category-output.dto";

export class ListCategoriesUseCase
  implements UseCase<InputListCategoriesUseCase, OutputListCategoriesUseCase>
{
  private repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(
    input: InputListCategoriesUseCase
  ): Promise<OutputListCategoriesUseCase> {
    const params = new CategorySearchParams(input);
    const searchResult = await this.repository.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(
    searchResult: CategorySearchResult
  ): OutputListCategoriesUseCase {
    return {
      ...PaginationOutputMapper.toOutput(searchResult),
      items: searchResult.items.map((item) =>
        CategoryOutputMapper.toOutput(item)
      ),
    };
  }
}

export type InputListCategoriesUseCase = SearchInputDto;

export type OutputListCategoriesUseCase = PaginationOutputDto<CategoryOutputDto>;
