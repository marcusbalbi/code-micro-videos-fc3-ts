import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  RemoveCategoryUseCase,
  UpdateCategoryUseCase,
} from '@balbi/core/category/application';
import { CategoryInMemoryRepository } from '@balbi/core/category/infra';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    },
    {
      provide: CreateCategoryUseCase,
      useFactory: (repo: CategoryInMemoryRepository) => {
        return new CreateCategoryUseCase(repo);
      },
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: ListCategoriesUseCase,
      useFactory: (repo: CategoryInMemoryRepository) => {
        return new ListCategoriesUseCase(repo);
      },
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: UpdateCategoryUseCase,
      useFactory: (repo: CategoryInMemoryRepository) => {
        return new UpdateCategoryUseCase(repo);
      },
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: GetCategoryUseCase,
      useFactory: (repo: CategoryInMemoryRepository) => {
        return new GetCategoryUseCase(repo);
      },
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: RemoveCategoryUseCase,
      useFactory: (repo: CategoryInMemoryRepository) => {
        return new RemoveCategoryUseCase(repo);
      },
      inject: ['CategoryInMemoryRepository'],
    },
  ],
})
export class CategoriesModule {}
