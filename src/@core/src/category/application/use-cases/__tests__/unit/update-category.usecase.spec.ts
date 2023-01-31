import { CategoryInMemoryRepository } from "#core/category/infra";
import { Category } from "../../../../domain/entities/category";
import {UpdateCategoryUseCase} from "../../update-category.usecase"

describe("UpdateCategoryUseCase unit test", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

    test("update category throw error when entity not found", async () => {
      const spy = jest.spyOn(repository, "findById");
      expect(() => {
        return useCase.execute({ id: "invalid-id", name: 'test' });
      }).rejects.toThrow();
      expect(spy).toHaveBeenCalled();
    });

  test('create a category', async () => {
    const spy = jest.spyOn(repository, 'update');
    const entity = new Category({ name: 'teste' })
    repository.items = [entity]

    const arrange = [
      {
        input: { id: entity.id, name: "test2" },
        expected: {
          id: entity.id,
          created_at: entity.created_at,
          name: "test2",
          description: undefined as any,
          is_active: true,
        },
      },
      {
        input: {
          id: entity.id,
          name: "testaa",
          description: "desc",
          is_active: false,
        },
        expected: {
          id: entity.id,
          created_at: entity.created_at,
          name: "testaa",
          description: "desc",
          is_active: false,
        },
      },
      {
        input: { id: entity.id, name: "test3" },
        expected: {
          id: entity.id,
          created_at: entity.created_at,
          name: "test3",
          description: undefined,
          is_active: false,
        },
      },
      {
        input: { id: entity.id, name: "test3", is_active: true },
        expected: {
          id: entity.id,
          created_at: entity.created_at,
          name: "test3",
          description: undefined as any,
          is_active: true,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test3",
          description: "aaaaas",
          is_active: false,
        },
        expected: {
          id: entity.id,
          created_at: entity.created_at,
          name: "test3",
          description: "aaaaas",
          is_active: false,
        },
      },
    ];

    for (const item of arrange) {
      const output = await useCase.execute(item.input);
      expect(output).toStrictEqual(item.expected);
    }
    expect(spy).toHaveBeenCalledTimes(arrange.length)
  });



})