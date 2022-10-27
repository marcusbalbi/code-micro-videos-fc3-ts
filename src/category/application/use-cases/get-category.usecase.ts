import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutputDto, CategoryOutputMapper } from "../dto/category-output.dto";
import UseCase from "../../../shared/application/use-case";
export default class GetCategoryUseCase implements UseCase<Input, CategoryOutputDto> {
  private repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<CategoryOutputDto> {
    const entity = await this.repository.findById(input.id);

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type Input = {
  id: string;
}