import { Category, CategoryRepository } from "#core/category/domain/index";
import { UseCase } from "#core/shared/application";
import { CategoryOutputDto, CategoryOutputMapper } from "../dto/category-output.dto";

export class CreateCategoryUseCase
  implements UseCase<InputCreateCategory, CategoryOutputDto>
{
  private repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(input: InputCreateCategory): Promise<CategoryOutputDto> {
    const entity = new Category(input);
    await this.repository.insert(entity);
    return CategoryOutputMapper.toOutput(entity);
  }
}

export type InputCreateCategory = {
  name: string;
  description?: string;
  is_active?: boolean;
}