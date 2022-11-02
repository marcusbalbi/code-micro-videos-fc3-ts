import { CategoryRepository } from "#core/category/domain";
import UseCase from "#core/shared/application/use-case";
import { CategoryOutputDto, CategoryOutputMapper } from "../dto/category-output.dto";

export class UpdateCategoryUseCase
  implements UseCase<InputUpdateCategoryUseCase, CategoryOutputDto>
{
  private repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(input: InputUpdateCategoryUseCase): Promise<CategoryOutputDto> {
    const entity = await this.repository.findById(input.id);
    entity.update(input.name, input.description);

    if (input.is_active === true) {
      entity.activate();
    }

    if (input.is_active === false) {
      entity.deactivate();
    }
    await this.repository.update(entity);
    return CategoryOutputMapper.toOutput(entity);
  }
}

export type InputUpdateCategoryUseCase = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
};