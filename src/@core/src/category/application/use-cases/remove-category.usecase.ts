import { CategoryRepository } from "#core/category/domain";
import { UseCase } from "#core/shared/application";

export class RemoveCategoryUseCase
  implements UseCase<InputRemoveCategoryUseCase, OutputRemoveCategoryUseCase>
{
  private repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(input: InputRemoveCategoryUseCase): Promise<void> {
    await this.repository.delete(input.id);
  }
}

export type InputRemoveCategoryUseCase = {
  id: string;
};

export type OutputRemoveCategoryUseCase = void;
