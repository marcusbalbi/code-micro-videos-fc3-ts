import { Category } from "#core/category/domain";
import { LoadEntityError } from "#core/shared/errors/load-entity.error";
import { setupSequelize } from "#core/shared/testing/db/sequelize";
import { CategoryModelMapper } from "./category-mapper";
import { CategoryModel } from "./category.model";

describe("Category Mapper", () => {
  setupSequelize({ models: [CategoryModel] })

  test("should map model to domain category", () => {
    const model = CategoryModel.build({
      id: "c9f381a7-ddcb-4967-931d-6628f67ec38c",
      name: "Movie",
      description: "test",
      is_active: true,
      created_at: new Date(),
    });
    const category = CategoryModelMapper.toEntity(model);
    expect(category.toJSON()).toStrictEqual(model.toJSON())
  });
  test("should throw error when category is invalid", () => {
    const model = CategoryModel.build({
      id: "c9f381a7-ddcb-4967-931d-6628f67ec38c",
    });
    try {
      CategoryModelMapper.toEntity(model);
      fail("category must be invalid in this test");
    } catch (err: any) {
      expect(err).toBeInstanceOf(LoadEntityError);
      expect(err.errors.name).toBeDefined();
    }
  });
  test("should throw error generic", () => {
    const spyValidate = jest
      .spyOn(Category, "validate")
      .mockImplementation(() => {
        throw new Error("generic error");
      });
    const model = CategoryModel.build({
      id: "c9f381a7-ddcb-4967-931d-6628f67ec38c",
    });
    try {
      CategoryModelMapper.toEntity(model);
      fail("category must be invalid in this test");
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("generic error");
      expect(spyValidate).toHaveBeenCalled();
    }
  });
});
