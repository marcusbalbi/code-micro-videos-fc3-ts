import { Category } from "#core/category/domain";
import { UniqueEntityId } from "#core/shared/domain";
import { setupSequelize } from "#core/shared/testing/db/sequelize";
import { CategoryModel } from "./category.model";
import { CategorySequelizeRepository } from "./category.repository";
describe("CategorySequeelizeRepository test", () => {
  let repository: CategorySequelizeRepository;
  setupSequelize({ models: [CategoryModel] });

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  it("should insert a new category", async () => {
    let category = new Category({ name: "Movie", description: "teste" });
    await repository.insert(category);
    const insertedCategory = await CategoryModel.findByPk(category.id);
    expect(insertedCategory.toJSON()).toStrictEqual(category.toJSON());
  });

  test("throw error when entity not found", async () => {
    await expect(repository.findById("aaa")).rejects.toThrow(
      `Entity not found using ID: aaa`
    );
    await expect(repository.findById(new UniqueEntityId())).rejects.toThrow(
      `Entity not found using ID:`
    );
  });

  test('should find a entity by ID', async () => {
    const id = new UniqueEntityId();
    await CategoryModel.create({ id: id.toString(), name: 'Movie', created_at: new Date(), is_active: true });
    const category = await repository.findById(id);
    expect(category.name).toEqual('Movie');
  });
  test('should find all categories', async () => {
    await CategoryModel.create({ id: new UniqueEntityId().toString(), name: 'Movie', created_at: new Date(), is_active: true });
    await CategoryModel.create({ id: new UniqueEntityId().toString(), name: 'Series', created_at: new Date(), is_active: true });
    const categories = await repository.findAll();
    expect(categories.length).toEqual(2);
  });

  test('search', async () => {
    // CategoryModel.factory().create();
    // console.log(await CategoryModel.findAll())
  });
});
