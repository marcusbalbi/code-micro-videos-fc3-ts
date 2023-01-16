import { setupSequelize } from "#core/shared/testing/db/sequelize";
import { DataType } from "sequelize-typescript";
import { CategoryModel } from "./category.model";

describe("Category Model Unit tests", () => {
  setupSequelize({ models: [CategoryModel] })

  test('mapping props', () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(attributesMap);
    expect(attributes).toStrictEqual(['id', 'name', 'description', 'is_active', 'created_at']);

    const idAttrs = attributesMap.id;
    expect(idAttrs).toMatchObject({
      field: 'id',
      fieldName: 'id',
      primaryKey: true,
      type: DataType.UUID(),
    })

    const nameAttrs = attributesMap.name;
    expect(nameAttrs).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(255),
    });

    const descAttrs = attributesMap.description;
    expect(descAttrs).toMatchObject({
      field: "description",
      fieldName: "description",
      allowNull: true,
      type: DataType.TEXT(),
    });

    const isActiveAttrs = attributesMap.is_active;
    expect(isActiveAttrs).toMatchObject({
      field: "is_active",
      fieldName: "is_active",
      allowNull: false,
      type: DataType.BOOLEAN(),
    });

    const createdAtAttrs = attributesMap.created_at;
    expect(createdAtAttrs).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      allowNull: false,
      type: DataType.DATE(),
    });
  });

  it("should create", async () => {
    const arrange = {
      id: "c8684b99-0cf1-4ec6-a23b-985ee2861b16",
      name: "Movie",
      created_at: new Date(),
      is_active: false,
    };
    const category = await CategoryModel.create(arrange);
    expect(category.toJSON()).toStrictEqual(arrange);
  });
});
