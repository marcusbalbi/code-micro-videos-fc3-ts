import { Category } from "#core/category/domain";
import { UniqueEntityId } from "#core/shared/domain";
import { LoadEntityError } from "#core/shared/errors/load-entity.error";
import { EntityValidationError } from "#core/shared/errors/validation-error";
import { CategoryModel } from "./category.model";

export class CategoryModelMapper {
  static toEntity(categoryModel: CategoryModel): Category {
    const { id, ...otherData } = categoryModel.toJSON();
    try {
      return new Category(otherData, new UniqueEntityId(id));
    } catch (err) {
      if (err instanceof EntityValidationError) {
        throw new LoadEntityError(err.errors);
      }
      throw err;
    }
  }
}