import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutputDto } from "../dto/category-output.dto";
import UseCase from "../../../shared/application/use-case";
export default class GetCategoryUseCase implements UseCase<Input, CategoryOutputDto> {
  private repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<CategoryOutputDto> {
    const entity = await this.repository.findById(input.id);

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
  id: string;
}