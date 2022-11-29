import { Category } from "#core/category/domain";
import { UniqueEntityId } from "#core/shared/domain";
import { CategoryModel } from "./category.model";

export class CategoryModelMapper {
  static toEntity(categoryModel: CategoryModel): Category {
    const { id, ...otherData } = categoryModel.toJSON();

    return new Category(otherData, new UniqueEntityId(id));
  }
}