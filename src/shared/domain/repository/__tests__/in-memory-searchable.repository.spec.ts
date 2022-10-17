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
    items: StubEntity[],
    filter: string
  ): Promise<StubEntity[]> {
    if (!filter) return this.items;

    return this.items.filter((i) => {
      return (
        i.props.name.toLowerCase().includes(filter) ||
        i.props.price.toString() === filter
      );
    });
  }
}

describe("InMemorySearchableRepository unit tests", () => {
  let repository: StubInMemorySearchableRepository;
  beforeEach(() => {
    repository = new StubInMemorySearchableRepository();
  })
  describe("applyFilter", () => {
  });

  describe("applySort", () => {});
  describe("applyPaginate", () => {});
  describe("search", () => {})
});
