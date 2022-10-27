import { CategoryRepository } from "../../domain/repository/category.repository";
import { Category } from "../../domain/entities/category";
import { CategoryOutputDto, CategoryOutputMapper } from "../dto/category-output.dto";
import UseCase from "../../../shared/application/use-case";

export default class CreateCategoryUseCase implements UseCase<Input, CategoryOutputDto> {
  private repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<CategoryOutputDto> {
    const entity = new Category(input);
    await this.repository.insert(entity);
    return CategoryOutputMapper.toOutput(entity);
  }
}

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
}