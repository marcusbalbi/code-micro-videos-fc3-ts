import {
  Category,
  CategorySearchParams,
  CategorySearchResult,
} from "#core/category/domain";
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
  });

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

  test("should find a entity by ID", async () => {
    const id = new UniqueEntityId();
    await CategoryModel.create({
      id: id.toString(),
      name: "Movie",
      created_at: new Date(),
      is_active: true,
    });
    const category = await repository.findById(id);
    expect(category.name).toEqual("Movie");
  });
  test("should find all categories", async () => {
    await CategoryModel.create({
      id: new UniqueEntityId().toString(),
      name: "Movie",
      created_at: new Date(),
      is_active: true,
    });
    await CategoryModel.create({
      id: new UniqueEntityId().toString(),
      name: "Series",
      created_at: new Date(),
      is_active: true,
    });
    const categories = await repository.findAll();
    expect(categories.length).toEqual(2);
  });

  describe("search method", () => {
    test("should only apply paginate when other params are null", async () => {
      const created_at = new Date();
      await CategoryModel.factory()
        .count(16)
        .bulkCreate(() => {
          return {
            id: chance.guid({ version: 4 }),
            name: "Movie",
            description: null,
            is_active: true,
            created_at,
          };
        });
      const spyToEntity = jest.spyOn(CategoryModelMapper, "toEntity");
      const searchOutput = await repository.search(new CategorySearchParams());
      expect(searchOutput).toBeInstanceOf(CategorySearchResult);
      expect(spyToEntity).toHaveBeenCalledTimes(15);
      expect(searchOutput.toJSON()).toMatchObject({
        total: 16,
        current_page: 1,
        last_page: 2,
        per_page: 15,
        sort: "created_at",
        sort_dir: "asc",
        filter: null,
      });
      for (const item of searchOutput.items) {
        expect(item).toBeInstanceOf(Category);
      }
    });
    test("should have created_at order when serch params are null", async () => {
      let lastDate = new Date();
      await CategoryModel.factory()
        .count(16)
        .bulkCreate(() => {
          lastDate = new Date(lastDate.getTime() + 1000);
          return {
            id: chance.guid({ version: 4 }),
            name: "Movie",
            description: null,
            is_active: true,
            created_at: lastDate,
          };
        });
      const searchOutput = await repository.search(new CategorySearchParams());
      expect(searchOutput).toBeInstanceOf(CategorySearchResult);
      expect(
        searchOutput.items[0].created_at.getTime() <
          searchOutput.items[1].created_at.getTime()
      ).toBe(true);
      expect(
        searchOutput.items[searchOutput.items.length - 2].created_at.getTime() <
          searchOutput.items[searchOutput.items.length - 1].created_at.getTime()
      ).toBe(true);
    });

    test("should have filter and paginate correct", async () => {
      let changeName = false;
      await CategoryModel.factory()
        .count(16)
        .bulkCreate(() => {
          changeName = !changeName;
          return {
            id: chance.guid({ version: 4 }),
            name: changeName ? "MovieA" : "MovieB",
            description: null,
            is_active: true,
            created_at: new Date(),
          };
        });
      const searchOutput = await repository.search(
        new CategorySearchParams({ per_page: 2, filter: "MovieA", page: 2 })
      );
      expect(searchOutput).toBeInstanceOf(CategorySearchResult);
      expect(searchOutput.toJSON()).toMatchObject({
        total: 8,
        current_page: 2,
        per_page: 2,
        sort: "created_at",
        sort_dir: "asc",
        filter: "MovieA",
        last_page: 4,
      });
    });

    test("should paginate and order", async () => {
      let lastDate = new Date();
      let charCodeName = 65; // A
      await CategoryModel.factory()
        .count(16)
        .bulkCreate(() => {
          lastDate = new Date(lastDate.getTime() + 1000);
          return {
            id: chance.guid({ version: 4 }),
            name: "Movie".concat(String.fromCharCode(charCodeName++)),
            description: null,
            is_active: true,
            created_at: lastDate,
          };
        });
      const searchOutput = await repository.search(
        new CategorySearchParams({
          per_page: 3,
          page: 2,
          sort: "name",
          sort_dir: "desc",
        })
      );
      expect(searchOutput).toBeInstanceOf(CategorySearchResult);
      expect(searchOutput.toJSON()).toMatchObject({
        total: 16,
        current_page: 2,
        per_page: 3,
        sort: "name",
        sort_dir: "desc",
        last_page: 6,
      });
      expect(searchOutput.items[0].name).toBe("MovieM");
      expect(searchOutput.items[1].name).toBe("MovieL");
      expect(searchOutput.items[2].name).toBe("MovieK");
    });

    test("should paginate, sort and sort", async () => {
      let lastDate = new Date();
      let charCodeName = 65; // A
      let changeName = false;
      await CategoryModel.factory()
        .count(16)
        .bulkCreate(() => {
          lastDate = new Date(lastDate.getTime() + 1000);
          changeName = !changeName;
          return {
            id: chance.guid({ version: 4 }),
            name: (changeName ? "Movie" : "Series").concat(
              String.fromCharCode(charCodeName++)
            ),
            description: null,
            is_active: true,
            created_at: lastDate,
          };
        });
      const searchOutput = await repository.search(
        new CategorySearchParams({
          per_page: 3,
          page: 2,
          sort: "name",
          sort_dir: "desc",
          filter: "Series",
        })
      );
      expect(searchOutput).toBeInstanceOf(CategorySearchResult);
      expect(searchOutput.toJSON()).toMatchObject({
        total: 8,
        current_page: 2,
        per_page: 3,
        sort: "name",
        sort_dir: "desc",
        last_page: 3,
        filter: "Series",
      });
      expect(searchOutput.items[0].name).toBe("SeriesJ");
      expect(searchOutput.items[1].name).toBe("SeriesH");
      expect(searchOutput.items[2].name).toBe("SeriesF");
    });
  });

  test("should update a category", async () => {
    let category = new Category({ name: "Movie", description: "teste" });
    await repository.insert(category);
    category.update("Movie", "teste2");
    await repository.update(category);
    const updated = await repository.findById(category.id);
    expect(updated.toJSON()).toStrictEqual(category.toJSON());
  });
  test("should throw an error if entity not found on update", async () => {
    let category = new Category({ name: "Movie", description: "teste" });
    category.update("Movie", "teste2");
    expect(repository.update(category)).rejects.toThrow();
  });

  test("should delete", async () => {
    let category = new Category({ name: "Movie", description: "teste" });
    await repository.insert(category);
    await repository.delete(category.id);
    expect(repository.findById(category.id)).rejects.toThrow();
  });
});
