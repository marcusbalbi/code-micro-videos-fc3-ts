import { Category, CategorySearchParams, CategorySearchResult } from "#core/category/domain";
import { UniqueEntityId } from "#core/shared/domain";
import { setupSequelize } from "#core/shared/testing/db/sequelize";
import { CategoryModel } from "./category.model";
import { CategorySequelizeRepository } from "./category.repository";
import Chance from "chance";
import { CategoryModelMapper } from "./category-mapper";

describe("CategorySequeelizeRepository test", () => {
  let repository: CategorySequelizeRepository;
  setupSequelize({ models: [CategoryModel] });

  let chance: Chance.Chance;

  beforeAll(() => {
    chance = new Chance();
  })

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  it("should insert a new category", async () => {
    let category = new Category({ name: "Movie", description: "teste" });
    await repository.insert(category);
    const insertedCategory = await CategoryModel.findByPk(category.id);
    expect(insertedCategory.toJSON()).toStrictEqual(category.toJSON());
  });

  test("throw error when entity not found", async () => {
    await expect(repository.findById("aaa")).rejects.toThrow(
      `Entity not found using ID: aaa`
    );
    await expect(repository.findById(new UniqueEntityId())).rejects.toThrow(
      `Entity not found using ID:`
    );
  });

  test('should find a entity by ID', async () => {
    const id = new UniqueEntityId();
    await CategoryModel.create({ id: id.toString(), name: 'Movie', created_at: new Date(), is_active: true });
    const category = await repository.findById(id);
    expect(category.name).toEqual('Movie');
  });
  test('should find all categories', async () => {
    await CategoryModel.create({ id: new UniqueEntityId().toString(), name: 'Movie', created_at: new Date(), is_active: true });
    await CategoryModel.create({ id: new UniqueEntityId().toString(), name: 'Series', created_at: new Date(), is_active: true });
    const categories = await repository.findAll();
    expect(categories.length).toEqual(2);
  });

  describe('search method', () => {
    test("should only apply paginate when other params are null", async () => {
      const created_at = new Date();
      await CategoryModel.factory().count(16).bulkCreate(() => {
        return {
          id: chance.guid({ version: 4 }),
          name: "Movie",
          description: null,
          is_active: true,
          created_at,
        };
      });
      const spyToEntity = jest.spyOn(CategoryModelMapper, 'toEntity');
      const searchOutput = await repository.search(new CategorySearchParams());
      expect(searchOutput).toBeInstanceOf(CategorySearchResult)
      expect(spyToEntity).toHaveBeenCalledTimes(15)
      expect(searchOutput.toJSON()).toMatchObject({
        total: 16,
        current_page: 1,
        last_page: 2,
        per_page: 15,
        sort: "created_at",
        sort_dir: 'asc',
        filter: null,
      });
      for (const item of searchOutput.items) {
        expect(item).toBeInstanceOf(Category)
      }
    });
    test("should have created_at order when serch params are null", async () => {
      const created_at = new Date();
      await CategoryModel.factory().count(16).bulkCreate(() => {
        return {
          id: chance.guid({ version: 4 }),
          name: "Movie",
          description: null,
          is_active: true,
          created_at: new Date(created_at.getTime() + 100),
        };
      });
      const searchOutput = await repository.search(new CategorySearchParams());
      expect(searchOutput).toBeInstanceOf(CategorySearchResult);
      expect(
        searchOutput.items[0].created_at.getTime() <
          searchOutput.items[1].created_at.getTime()
      );
      expect(
        searchOutput.items[searchOutput.items.length - 2].created_at.getTime() <
          searchOutput.items[searchOutput.items.length - 1].created_at.getTime()
      );
    });
  })
});
