import { Category } from "../../../../domain/entities/category";
import {ListCategoriesUseCase} from "../../list-categories.usecase";
import { CategorySequelizeRepository } from "#core/category/infra/db/sequelize/category.repository";
import { CategoryModel } from "#core/category/infra/db/sequelize/category.model";
import { setupSequelize } from "#core/shared/testing/db/sequelize";

describe("ListCategoryUseCase Integration test", () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new ListCategoriesUseCase(repository);
  });

  test("should return output using empty input with categories ordered by created_at", async () => {
    const categories = [
      new Category({ name: "test 1", created_at: new Date(Date.now() + 200) }),
      new Category({ name: "test 2", created_at: new Date(Date.now() + 100) }),
    ];

    for (const category of categories) {
      await repository.insert(category);
    }

    const items = (await (repository.findAll())).map(i => i.toJSON()).reverse();

    const result = await useCase.execute({});
    expect(result).toStrictEqual({
      items: items,
      current_page: 1,
      per_page: 15,
      total: 2,
      last_page: 1,
    });
  });

  test("should return output using pagination input with sort and filter", async () => {
    const categories = [
      new Category({ name: "a"}),
      new Category({ name: "AAA"}),
      new Category({ name: "AaA"}),
      new Category({ name: "b"}),
      new Category({ name: "c"}),
      new Category({ name: "d"}),
    ];

    for (const category of categories) {
      await repository.insert(category);
    }

    const items = (await (repository.findAll())).map(i => i.toJSON());

    let result = await useCase.execute({ filter: 'a', page: 1, per_page: 2, sort: 'name' });
    expect(result).toMatchObject({
      items: [
        {
          id: items[1].id,
          name: items[1].name,
          description: items[1].description,
          is_active: items[1].is_active,
          created_at: items[1].created_at,
        },
        {
          id: items[2].id,
          name: items[2].name,
          description: items[2].description,
          is_active: items[2].is_active,
          created_at: items[2].created_at,
        },
      ],
      current_page: 1,
      per_page: 2,
      total: 3,
      last_page: 2,
    });

    result = await useCase.execute({ filter: 'a', page: 2, per_page: 2, sort: 'name' });
    expect(result).toMatchObject({
      items: [
        {
          id: items[0].id,
          name: items[0].name,
          description: items[0].description,
          is_active: items[0].is_active,
          created_at: items[0].created_at,
        },
      ],
      current_page: 2,
      per_page: 2,
      total: 3,
      last_page: 2,
    });

    result = await useCase.execute({ filter: 'a', page: 1, per_page: 2, sort: 'name', sort_dir: 'desc' });
    expect(result).toMatchObject({
      items: [
        {
          id: items[0].id,
          name: items[0].name,
          description: items[0].description,
          is_active: items[0].is_active,
          created_at: items[0].created_at,
        },
        {
          id: items[2].id,
          name: items[2].name,
          description: items[2].description,
          is_active: items[2].is_active,
          created_at: items[2].created_at,
        },
      ],
      current_page: 1,
      per_page: 2,
      total: 3,
      last_page: 2,
    });
  });
});
