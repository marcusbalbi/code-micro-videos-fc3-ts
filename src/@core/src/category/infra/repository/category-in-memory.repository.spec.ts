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
    const result2 = await repository.search(new CategorySearchParams({ sort: null, sort_dir: null }));

    expect(result.items).toStrictEqual([items[1], items[0]]);
    expect(result2.items).toStrictEqual([items[1], items[0]]);
  });
  test("sort by name", async () => {
    const items = [
      new Category({ name: "Category E", created_at: new Date("2022-01-05") }),
      new Category({ name: "Category D", created_at: new Date("2022-01-02") }),
    ];
    repository.items = items;
    const result = await repository.search(new CategorySearchParams({ sort: 'name' }));
    const result2 = await repository.search(new CategorySearchParams({ sort: 'name', sort_dir: 'desc' }));

    expect(result.items).toStrictEqual([items[1], items[0]]);
    expect(result2.items).toStrictEqual([items[0], items[1]]);
  });
  test("filter by start", async () => {
    const items = [
      new Category({ name: "Category A", created_at: new Date("2022-01-05") }),
      new Category({ name: "CaTeGoRy B", created_at: new Date("2022-01-05") }),
      new Category({ name: "C Category", created_at: new Date("2022-01-05") }),
    ];
    repository.items = items;
    const result = await repository.search(
      new CategorySearchParams({ filter: "Category" })
    );

    expect(result.items.length).toBe(2);
    expect(result.items).toStrictEqual([items[0], items[1]]);
  });
  test('null filter returns items', async () => {
    const items = [
      new Category({ name: "Category A" }),
      new Category({ name: "Category B" }),
    ];
    repository.items = items;
    const result = await repository.search(
      new CategorySearchParams({ filter: null })
    );
    expect(result.items).toStrictEqual(items);
  })
});
