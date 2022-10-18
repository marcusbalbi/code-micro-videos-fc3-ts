import { Category } from "../../domain/entities/category";
import { CategorySearchParams } from "../../domain/repository/category.repository";
import { CategoryInMemoryRepository } from "./category-in-memory.repository";

describe("CategoryInMemoryRepository unit tests", () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });
  test("default sort field should be created_at", async () => {
    const items = [
      new Category({ name: "Category A", created_at: new Date("2022-01-05") }),
      new Category({ name: "Category B", created_at: new Date("2022-01-02") }),
    ];
    repository.items = items;
    const result = await repository.search(new CategorySearchParams());

    expect(result.items).toStrictEqual([items[1], items[0]]);
  });
  test("sort by name", async () => {
    const items = [
      new Category({ name: "Category E", created_at: new Date("2022-01-05") }),
      new Category({ name: "Category D", created_at: new Date("2022-01-02") }),
    ];
    repository.items = items;
    const result = await repository.search(new CategorySearchParams({ sort: 'name' }));

    expect(result.items).toStrictEqual([items[1], items[0]]);
  });
  test("filter by start", async () => {
    const items = [
      new Category({ name: "Category A", created_at: new Date("2022-01-05") }),
      new Category({ name: "B Category", created_at: new Date("2022-01-02") }),
    ];
    repository.items = items;
    const result = await repository.search(
      new CategorySearchParams({ filter: "Category" })
    );

    expect(result.items.length).toBe(1);
    expect(result.items).toStrictEqual([items[0]]);
  });
});
