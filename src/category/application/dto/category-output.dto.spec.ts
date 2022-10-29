import { Category } from "@core/category/domain/entities/category";
import { CategoryOutputMapper } from "./category-output.dto";

describe("CategoryOutputDto unit tests", () => {
  test("CategoryOutputMapper convert output", () => {
    const category = new Category({
      name: 'test',
      description: 'aba',
    })
    const result = CategoryOutputMapper.toOutput(category)
    expect(result).toStrictEqual({
      id: category.id,
      name: category.name,
      created_at: category.created_at,
      description: category.description,
      is_active: category.is_active,
    })
  });
});
