import { Category } from "#core/category/domain/entities/category";

export type CategoryOutputDto = {
  id: string;
  name: string;
  description: string | undefined;
  is_active: boolean | undefined;
  created_at: Date | undefined;
};

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutputDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    };
  }
}
