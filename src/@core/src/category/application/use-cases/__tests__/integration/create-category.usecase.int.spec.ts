import { CategoryInMemoryRepository } from "#core/category/infra";
import { CategoryModel } from "#core/category/infra/db/sequelize/category.model";
import { CategorySequelizeRepository } from "#core/category/infra/db/sequelize/category.repository";
import { setupSequelize } from "#core/shared/testing/db/sequelize";
import {CreateCategoryUseCase} from "../../create-category.usecase"

describe("CreateCategoryUseCase integration test", () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] })

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new CreateCategoryUseCase(repository);
  });

  test('create a category', async () => {
    const output = await useCase.execute({ name: 'Movie', description: 'A Movie' });
    const saved = await repository.findById(output.id);
    expect(saved.id).toBe(output.id)
    expect(saved.name).toBe(output.name)
    expect(saved.is_active).toBe(output.is_active);
    expect(saved.props.created_at).toEqual(output.created_at);
  });
})