import { CategoryModel } from "#core/category/infra/db/sequelize/category.model";
import { CategorySequelizeRepository } from "#core/category/infra/db/sequelize/category.repository";
import { UniqueEntityId } from "#core/shared/domain";
import { setupSequelize } from "#core/shared/testing/db/sequelize";
import { Category } from "../../../../domain/entities/category";
import {RemoveCategoryUseCase} from "../../remove-category.usecase";

describe("RemoveCategoryUseCase integration test", () => {
  let useCase: RemoveCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new RemoveCategoryUseCase(repository);
  });

  test("remove category should throw error if entity not exists", async () => {
    await expect(useCase.execute({ id: new UniqueEntityId().toString() })).rejects.toThrow()
  });
  test('remove a category', async () => {
    const category = new Category({ name: "Movie", description: "test" });
    await repository.insert(category);
    await useCase.execute({ id: category.id })
    await expect(repository.findById(category.id)).rejects.toThrow();
  });
});
