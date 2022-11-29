import { Category, CategoryRepository, CategorySearchParams, CategorySearchResult } from "#core/category/domain";
import { UniqueEntityId } from "#core/shared/domain";
import { NotFoundError } from "#core/shared/errors/not-found-error";
import { CategoryModelMapper } from "./category-mapper";
import { CategoryModel } from "./category.model";

export class CategorySequelizeRepository implements CategoryRepository {
  sortableFields: string[]= ['name', 'created_at'];

  constructor (private categoryModel: typeof CategoryModel) {
  }

  async search(props: CategorySearchParams): Promise<CategorySearchResult> {
    throw new Error("Method not implemented.");
  }
  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }
  async findById(id: string | UniqueEntityId): Promise<Category> {
    const model = await this._get(id.toString());
    return CategoryModelMapper.toEntity(model);
  }
  async findAll(): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }
  async update(entity: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private async _get(id : string) {
    return this.categoryModel.findByPk(id.toString(), { rejectOnEmpty: new NotFoundError(`Entity not found using ID: ${id}`) });
  }

}