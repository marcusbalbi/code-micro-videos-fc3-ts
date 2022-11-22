import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  RemoveCategoryUseCase,
  UpdateCategoryUseCase,
} from '@balbi/core/category/application';
import { CategoryInMemoryRepository } from '@balbi/core/category/infra';

const REPOSITORY_NAME = 'CategoryInMemoryRepository';

export const CATEGORY_IN_MEMORY_REPOSITORY = {
  provide: REPOSITORY_NAME,
  useClass: CategoryInMemoryRepository,
};

export const CREATE_CATEGORY_USE_CASE = {
  provide: CreateCategoryUseCase,
  useFactory: (repo: CategoryInMemoryRepository) => {
    return new CreateCategoryUseCase(repo);
  },
  inject: [REPOSITORY_NAME],
};

export const LIST_CATEGORIES_USE_CASE = {
  provide: ListCategoriesUseCase,
  useFactory: (repo: CategoryInMemoryRepository) => {
    return new ListCategoriesUseCase(repo);
  },
  inject: [REPOSITORY_NAME],
};
export const UPDATE_CATEGORY_USE_CASE = {
  provide: UpdateCategoryUseCase,
  useFactory: (repo: CategoryInMemoryRepository) => {
    return new UpdateCategoryUseCase(repo);
  },
  inject: [REPOSITORY_NAME],
};
export const GET_CATEGORY_USE_CASE = {
  provide: GetCategoryUseCase,
  useFactory: (repo: CategoryInMemoryRepository) => {
    return new GetCategoryUseCase(repo);
  },
  inject: [REPOSITORY_NAME],
};
export const REMOVE_CATEGORY_USE_CASE = {
  provide: RemoveCategoryUseCase,
  useFactory: (repo: CategoryInMemoryRepository) => {
    return new RemoveCategoryUseCase(repo);
  },
  inject: [REPOSITORY_NAME],
};
