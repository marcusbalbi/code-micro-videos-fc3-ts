import { Category } from "../../../domain/entities/category";
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import GetCategoryUseCase from "../get-category.usecase"

describe("GetCategoryUseCase unit test", () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  test('get category throw error when entity not fodun', async () => {
    const spy = jest.spyOn(repository, "findById");
    expect( () => {
      return useCase.execute({ id: "invalid-id" });
    }).rejects.toThrow();
    expect(spy).toHaveBeenCalled();
    
  });
  test('return a category', async () => {
    const spy = jest.spyOn(repository, 'findById');
    const category = new Category({ name: 'test' });
    repository.items.push(category);
    let output = await useCase.execute({ id: category.id });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      created_at: repository.items[0].created_at,
      name: 'test',
      description: undefined,
      is_active: true,
    });
    expect(spy).toHaveBeenCalled()
  });



})