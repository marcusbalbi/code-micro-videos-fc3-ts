import { CategoryRepository } from "../../domain/repository/category.repository";
import { Category } from "../../domain/entities/category";
import { CategoryOutputDto, CategoryOutputMapper } from "../dto/category-output.dto";
import UseCase from "../../../shared/application/use-case";

export default class UpdateCategoryUseCase implements UseCase<Input, CategoryOutputDto> {
  private repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<CategoryOutputDto> {
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

export type Input = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}