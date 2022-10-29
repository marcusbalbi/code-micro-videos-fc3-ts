import { CategoryRepository } from "../../domain/repository/category.repository";
import UseCase from "../../../shared/application/use-case";
export default class RemoveCategoryUseCase implements UseCase<Input, Output> {
  private repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(input: Input): Promise<Output> {
    await this.repository.delete(input.id);
    return true
  }
}

export type Input = {
  id: string;
};

export type Output = boolean;
