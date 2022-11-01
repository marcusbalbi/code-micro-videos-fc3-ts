import { Category } from "../../../domain/entities/category";
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import RemoveCategoryUseCase from "../remove-category.usecase";

describe("RemoveCategoryUseCase unit test", () => {
  let useCase: RemoveCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new RemoveCategoryUseCase(repository);
  });

  test("remove category should throw error if entity not exists", async () => {
    const spy = jest.spyOn(repository, "delete");
    expect(() => {
      return useCase.execute({ id: "invalid-id" });
    }).rejects.toThrow();
    expect(spy).toHaveBeenCalled();
  });
  test('remove a category', async () => {
    const spy = jest.spyOn(repository, 'delete');
    const category = new Category({ name: 'test' });
    repository.items.push(category);
    let output = await useCase.execute({ id: category.id });
    expect(output).toBeUndefined();
    expect(repository.items.length).toBe(0)
    expect(spy).toHaveBeenCalled()
  });
});
