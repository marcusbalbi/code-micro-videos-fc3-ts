import { Category } from "../../domain/entities/category";
import { InMemorySearchableRepository } from "../../../shared/domain/repository/in-memory.repository";
import { CategoryFilter, CategoryRepository } from "category/domain/repository/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository
{
  protected async applyFilter(
    items: Category[],
    filter: CategoryFilter
  ): Promise<Category[]> {
    if (!filter) return items;

    return items.filter((i) => {
      return (
        i.props.name.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }
}
