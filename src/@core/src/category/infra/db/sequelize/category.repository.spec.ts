import { Category } from "#core/category/domain";
import { UniqueEntityId } from "#core/shared/domain";
import { DataType, Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category.model";
import { CategorySequelizeRepository } from "./category.repository";
describe("CategorySequeelizeRepository test", () => {
  let sequelize: Sequelize;
  let repository: CategorySequelizeRepository;
  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: false,
      models: [CategoryModel],
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  afterAll(async () => {
    await sequelize.close();
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

});
