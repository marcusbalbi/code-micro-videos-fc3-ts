import { CategoryRepository, CategorySearchParams, CategorySearchResult } from "../../domain/repository/category.repository";
import { CategoryOutputDto, CategoryOutputMapper } from "../dto/category-output.dto";
import UseCase from "../../../shared/application/use-case";
import { SearchInputDto } from "../../../shared/application/dto/search-input.dto";
import { PaginationOutputDto, PaginationOutputMapper } from "../../../shared/application/dto/pagination-output.dto";

export default class ListCategoriesUseCase implements UseCase<Input, Output> {
  private repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<Output> {
    const params = new CategorySearchParams(input);
    const searchResult = await this.repository.search(params);

    return this.toOutput(searchResult)
  }

  private toOutput(searchResult: CategorySearchResult): Output {
    return {
      ...PaginationOutputMapper.toOutput(searchResult),
      items: searchResult.items.map((item) =>
        CategoryOutputMapper.toOutput(item)
      ),
    };
  }
}

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutputDto>
