import { CategoryRepository } from "../../domain/repository/category.repository";
import { Category } from "../../domain/entities/category";
import { CategoryOutputDto } from "../dto/category-output.dto";
import UseCase from "../../../shared/application/use-case";

export default class CreateCategoryUseCase implements UseCase<Input, CategoryOutputDto> {
  private repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<CategoryOutputDto> {
    const entity = new Category(input);

    await this.repository.insert(entity);

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    };
  }
}

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
}