import { Category } from "../../domain/entities/category";
import { InMemorySearchableRepository } from "../../../shared/domain/repository/in-memory.repository";
import { CategoryFilter, CategoryRepository } from "src/category/domain/repository/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository
{
  sortableFields: string[] = ['name', 'created_at'];
  protected async applyFilter(
    items: Category[],
    filter: CategoryFilter
  ): Promise<Category[]> {
    if (!filter) return items;

    return items.filter((i) => {
      return i.props.name.toLowerCase().startsWith(filter.toLowerCase());
    });
  }
}
