import { Category } from "@core/category/domain/entities/category";
import { CategoryFilter, CategoryRepository } from "@core/category/domain/repository/category.repository";
import { InMemorySearchableRepository } from "@core/shared/domain/repository/in-memory.repository";

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
