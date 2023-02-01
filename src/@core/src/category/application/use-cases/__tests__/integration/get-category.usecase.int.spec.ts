import { CategoryInMemoryRepository } from "#core/category/infra";
import { CategoryModel } from "#core/category/infra/db/sequelize/category.model";
import { setupSequelize } from "#core/shared/testing/db/sequelize";
import { Category } from "../../../../domain/entities/category";
import { GetCategoryUseCase } from "../../get-category.usecase";

describe("GetCategoryUseCase Integration test", () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  test("get category throw error when entity not found", async () => {
    const category = new Category({ name: "Movie", description: "test" });
    await expect(useCase.execute({ id: category.id })).rejects.toThrow();
  });
  test("return a category", async () => {
    const category = new Category({ name: "Movie", description: "test" });
    await repository.insert(category);
    const output = await useCase.execute(category);
    expect(category.id).toBe(output.id);
    expect(category.name).toBe(output.name);
    expect(category.is_active).toBe(output.is_active);
    expect(category.props.created_at).toEqual(output.created_at);
  });
});
