import { CategorySearchResult } from "../../../domain/repository/category.repository";
import { Category } from "../../../domain/entities/category";
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository";
import ListCategoriesUseCase from "../list-categories.usecase";

describe("ListCategoryUseCase unit test", () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  });

  test("toOutput", () => {
    let searchResult = new CategorySearchResult({
      items: [],
      current_page: 1,
      per_page: 1,
      total: 2,
      filter: null,
      sort: null,
      sort_dir: null,
    });

    let output = useCase["toOutput"](searchResult);
    expect(output).toStrictEqual({
      items: [],
      current_page: 1,
      per_page: 1,
      total: 2,
      last_page: 2,
    });

    const entity = new Category({ name: "test", description: "desc" });
    searchResult = new CategorySearchResult({
      items: [entity],
      current_page: 1,
      per_page: 1,
      total: 2,
      filter: null,
      sort: null,
      sort_dir: null,
    });

    output = useCase["toOutput"](searchResult);
    expect(output).toStrictEqual({
      items: [
        {
          id: entity.id,
          name: entity.name,
          description: entity.description,
          is_active: entity.is_active,
          created_at: entity.created_at,
        },
      ],
      current_page: 1,
      per_page: 1,
      total: 2,
      last_page: 2,
    });
  });

  test("should return output using empty input with categories ordered by created_at", async () => {
    const categories = [
      new Category({ name: "test 1", created_at: new Date(Date.now() + 200) }),
      new Category({ name: "test 2", created_at: new Date(Date.now() + 100) }),
    ];

    repository.items = categories;

    const result = await useCase.execute({});

    expect(result).toStrictEqual({
      items: [
        {
          id: repository.items[1].id,
          name: repository.items[1].name,
          description: repository.items[1].description,
          is_active: repository.items[1].is_active,
          created_at: repository.items[1].created_at,
        },
        {
          id: repository.items[0].id,
          name: repository.items[0].name,
          description: repository.items[0].description,
          is_active: repository.items[0].is_active,
          created_at: repository.items[0].created_at,
        },
      ],
      current_page: 1,
      per_page: 15,
      total: 2,
      last_page: 1,
    });

    


  });

  test("should return output using pagination input with sort and filter", async () => {
    const categories = [
      new Category({ name: "a"}),
      new Category({ name: "AAA"}),
      new Category({ name: "AaA"}),
      new Category({ name: "b"}),
      new Category({ name: "c"}),
      new Category({ name: "d"}),
    ];

    repository.items = categories;

    let result = await useCase.execute({ filter: 'a', page: 1, per_page: 2, sort: 'name' });
    expect(result).toStrictEqual({
      items: [
        {
          id: repository.items[1].id,
          name: repository.items[1].name,
          description: repository.items[1].description,
          is_active: repository.items[1].is_active,
          created_at: repository.items[1].created_at,
        },
        {
          id: repository.items[2].id,
          name: repository.items[2].name,
          description: repository.items[2].description,
          is_active: repository.items[2].is_active,
          created_at: repository.items[2].created_at,
        },
      ],
      current_page: 1,
      per_page: 2,
      total: 3,
      last_page: 2,
    });

    result = await useCase.execute({ filter: 'a', page: 2, per_page: 2, sort: 'name' });
    expect(result).toStrictEqual({
      items: [
        {
          id: repository.items[0].id,
          name: repository.items[0].name,
          description: repository.items[0].description,
          is_active: repository.items[0].is_active,
          created_at: repository.items[0].created_at,
        },
      ],
      current_page: 2,
      per_page: 2,
      total: 3,
      last_page: 2,
    });

    result = await useCase.execute({ filter: 'a', page: 1, per_page: 2, sort: 'name', sort_dir: 'desc' });
    expect(result).toStrictEqual({
      items: [
        {
          id: repository.items[0].id,
          name: repository.items[0].name,
          description: repository.items[0].description,
          is_active: repository.items[0].is_active,
          created_at: repository.items[0].created_at,
        },
        {
          id: repository.items[2].id,
          name: repository.items[2].name,
          description: repository.items[2].description,
          is_active: repository.items[2].is_active,
          created_at: repository.items[2].created_at,
        },
      ],
      current_page: 1,
      per_page: 2,
      total: 3,
      last_page: 2,
    });
  });
});
