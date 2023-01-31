import { CategoryInMemoryRepository } from "#core/category/infra";
import {CreateCategoryUseCase} from "../../create-category.usecase"

describe("CreateCategoryUseCase unit test", () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  test('create a category', async () => {
    const spy = jest.spyOn(repository, 'insert');
    let output = await useCase.execute({ name: 'test' });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      created_at: repository.items[0].created_at,
      name: 'test',
      description: undefined,
      is_active: true,
    });
    expect(spy).toHaveBeenCalledTimes(1);

    output = await useCase.execute({ name: 'test', description: 'desc', is_active: false });
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      created_at: repository.items[1].created_at,
      name: 'test',
      description: 'desc',
      is_active: false,
    });
    expect(spy).toHaveBeenCalledTimes(2);
  });



})