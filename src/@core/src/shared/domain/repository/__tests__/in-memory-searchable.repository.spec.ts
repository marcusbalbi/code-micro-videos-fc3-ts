import { Entity } from "../../entities";
import { InMemorySearchableRepository } from "../in-memory.repository";
import { SearchParams, SearchResult } from "../repository-contracts";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ["name"];

  protected async applyFilter(
    items: StubEntity[] | null,
    filter: string
  ): Promise<StubEntity[]> {
    if (!filter) return items;

    return items.filter((i) => {
      return (
        i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        i.props.price.toString() === filter.toLowerCase()
      );
    });
  }
}

describe("InMemorySearchableRepository unit tests", () => {
  let repository: StubInMemorySearchableRepository;
  beforeEach(() => {
    repository = new StubInMemorySearchableRepository();
  });
  describe("applyFilter", () => {
    test("return items if filter is empty", async () => {
      const items = [
        new StubEntity({ name: "name value", price: 5 }),
        new StubEntity({ name: "john doe", price: 5 }),
      ];
      const spyFilterMethod = jest.spyOn(items, "filter");
      const result = await repository["applyFilter"](items, null);
      expect(result).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });
    test("filter using param", async () => {
      const items = [
        new StubEntity({ name: "name value", price: 5 }),
        new StubEntity({ name: "john doe", price: 1 }),
        new StubEntity({ name: "Jane doe", price: 1 }),
      ];
      const spyFilterMethod = jest.spyOn(items, "filter");
      let result = await repository["applyFilter"](items, "DOE");
      expect(result.length).toBe(2);
      expect(result[0]).toStrictEqual(items[1]);
      expect(result[1]).toStrictEqual(items[2]);
      expect(spyFilterMethod).toHaveBeenCalled();

      result = await repository["applyFilter"](items, "5");
      expect(result.length).toBe(1);
      expect(result[0]).toStrictEqual(items[0]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      result = await repository["applyFilter"](items, "empty");
      expect(result.length).toBe(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe("applySort", () => {
    test("no sort items", async () => {
      const items = [
        new StubEntity({ name: "b", price: 5 }),
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "c", price: 1 }),
      ];
      let result = await repository["applySort"](items, null, null);
      expect(result).toStrictEqual(items);

      result = await repository["applySort"](items, "price", "asc");
      expect(result).toStrictEqual(items);
    });

    test("sort items", async () => {
      const items = [
        new StubEntity({ name: "b", price: 5 }),
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "c", price: 1 }),
      ];
      let result = await repository["applySort"](items, "name", "asc");
      expect(result).toStrictEqual([items[1], items[0], items[2]]);

      result = await repository["applySort"](items, "name", "desc");
      expect(result).toStrictEqual([items[2], items[0], items[1]]);
    });
  });
  describe("applyPaginate", () => {
    const items = [
      new StubEntity({ name: "a", price: 5 }),
      new StubEntity({ name: "b", price: 1 }),
      new StubEntity({ name: "c", price: 1 }),
      new StubEntity({ name: "d", price: 1 }),
      new StubEntity({ name: "e", price: 1 }),
    ];

    test("paginate invalid", async () => {
      let result = await repository["applyPaginate"](items, 4, 2);
      expect(result.length).toBe(0);

      result = await repository["applyPaginate"](items, 0, 2);
      expect(result.length).toBe(0);
    });
    test("paginate", async () => {
      let result = await repository["applyPaginate"](items, 1, 2);
      expect(result.length).toBe(2);
      expect(result).toStrictEqual([items[0], items[1]]);

      result = await repository["applyPaginate"](items, 2, 2);
      expect(result.length).toBe(2);
      expect(result).toStrictEqual([items[2], items[3]]);

      result = await repository["applyPaginate"](items, 3, 2);
      expect(result.length).toBe(1);
      expect(result).toStrictEqual([items[4]]);
    });
  });
  describe("search", () => {
    test("search only paginate when other params are null", async () => {
      const entity = new StubEntity({ name: "a", price: 5 });
      const items = Array(16).fill(entity);
      repository.items = items;
      const result = await repository.search(new SearchParams());
      expect(result).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          current_page: 1,
          per_page: 15,
          sort: null,
          sort_dir: null,
          filter: null,
        })
      );
    });
    test("search paginate + filter", async () => {
      const items = [
        new StubEntity({ name: "TeStE", price: 5 }),
        new StubEntity({ name: "teste", price: 1 }),
        new StubEntity({ name: "TESTE", price: 1 }),
        new StubEntity({ name: "a", price: 1 }),
      ];
      repository.items = items;
      let result = await repository.search(
        new SearchParams({ filter: "teste", page: 1, per_page: 2 })
      );
      expect(result).toStrictEqual(
        new SearchResult({
          items: [items[0], items[1]],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: "teste",
        })
      );

      result = await repository.search(
        new SearchParams({ filter: "teste", page: 2, per_page: 2 })
      );
      expect(result).toStrictEqual(
        new SearchResult({
          items: [items[2]],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: "teste",
        })
      );
    });
    test("search paginate + sort", async () => {
      const items = [
        new StubEntity({ name: "b", price: 5 }),
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "d", price: 1 }),
        new StubEntity({ name: "e", price: 1 }),
        new StubEntity({ name: "c", price: 1 }),
      ];
      repository.items = items;

      const arrange = [
        {
          params: new SearchParams({ page: 1, per_page: 2, sort: "name" }),
          result: new SearchResult({
            items: [items[1], items[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: null,
          }),
        },
        {
          params: new SearchParams({ page: 2, per_page: 2, sort: "name" }),
          result: new SearchResult({
            items: [items[4], items[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: null,
          }),
        },
        {
          params: new SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new SearchResult({
            items: [items[3], items[2]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
            filter: null,
          }),
        },
        {
          params: new SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new SearchResult({
            items: [items[4], items[0]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
            filter: null,
          }),
        },
      ];
      for (const a of arrange) {
        let result = await repository.search(a.params);
        expect(result).toStrictEqual(a.result);
      }
    });

    test("search paginate + sort + filter", async () => {
      const items = [
        new StubEntity({ name: "test", price: 5 }),
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "TEST", price: 1 }),
        new StubEntity({ name: "e", price: 1 }),
        new StubEntity({ name: "TeStE", price: 1 }),
      ];
      repository.items = items;

      const arrange = [
        {
          params: new SearchParams({ page: 1, per_page: 2, sort: "name", filter: 'TEST' }),
          result: new SearchResult({
            items: [items[2], items[4]],
            total: 3,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter:  'TEST',
          }),
        },
        {
          params: new SearchParams({ page: 2, per_page: 2, sort: "name", filter: 'TEST' }),
          result: new SearchResult({
            items: [items[0]],
            total: 3,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: "TEST",
          }),
        },
      ];
      for (const a of arrange) {
        let result = await repository.search(a.params);
        expect(result).toStrictEqual(a.result);
      }
    });
  });
});
