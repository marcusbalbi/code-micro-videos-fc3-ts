import { CategoryRepository } from "#core/category/domain";
import { CategoryInMemoryRepository } from "#core/category/infra";
import { UseCase } from "#core/shared/application";
import { CategoryOutputDto, CategoryOutputMapper } from "../dto/category-output.dto";
export class GetCategoryUseCase
  implements UseCase<InputGetCategoryUseCase, CategoryOutputDto>
{
  private repository: CategoryRepository;
  constructor(repository: CategoryInMemoryRepository) {
    this.repository = repository;
  }

  async execute(input: InputGetCategoryUseCase): Promise<CategoryOutputDto> {
    const entity = await this.repository.findById(input.id);

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type InputGetCategoryUseCase = {
  id: string;
};