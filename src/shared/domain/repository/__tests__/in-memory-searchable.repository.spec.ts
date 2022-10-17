import Entity from "../../../../shared/domain/entities/entity";
import { InMemorySearchableRepository } from "../in-memory.repository";

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
  describe("applyPaginate", () => {});
  describe("search", () => {});
});
