import {
  Category,
  CategoryRepository,
  CategorySearchParams,
  CategorySearchResult,
} from "#core/category/domain";
import { UniqueEntityId } from "#core/shared/domain";
import { NotFoundError } from "#core/shared/errors/not-found-error";
import { Op, Order, WhereOptions } from "sequelize";
import { CategoryModelMapper } from "./category-mapper";
import { CategoryModel } from "./category.model";

export class CategorySequelizeRepository implements CategoryRepository {
  sortableFields: string[] = ["name", "created_at"];

  constructor(private categoryModel: typeof CategoryModel) {}

  async search(props: CategorySearchParams): Promise<CategorySearchResult> {
    const { page, per_page, sort, sort_dir, filter  } = props;
    const offset = (page - 1) * per_page;
    let where: any = {};
    if (filter) {
      where.name = { [Op.like]: `%${filter}%` };
    }
    let order: Order = [['created_at', 'desc']];
    if (sort && this.sortableFields.includes(sort)) {
      order = [[sort, sort_dir || "ASC"]];
    }
    const { rows, count } = await this.categoryModel.findAndCountAll({
      where,
      limit: per_page,
      offset,
      order,
    });
    return new CategorySearchResult({
      items: rows.map((r) => CategoryModelMapper.toEntity(r)),
      total: count,
      current_page: page,
      per_page: per_page,
      sort: sort,
      sort_dir: sort_dir,
      filter: filter,
    });
  }
  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }
  async findById(id: string | UniqueEntityId): Promise<Category> {
    const model = await this._get(id.toString());
    return CategoryModelMapper.toEntity(model);
  }
  async findAll(): Promise<Category[]> {
    const categories = await this.categoryModel.findAll();
    return categories.map(CategoryModelMapper.toEntity);
  }
  async update(entity: Category): Promise<void> {
    await this._get(entity.id)
    await this.categoryModel.update(entity.toJSON(), { where: { id: entity.id } });
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${ id }`;
    await this._get(_id);
    await this.categoryModel.destroy({ where: { id: _id } })
  }

  private async _get(id: string) {
    return this.categoryModel.findByPk(id.toString(), {
      rejectOnEmpty: new NotFoundError(`Entity not found using ID: ${id}`),
    });
  }
}
