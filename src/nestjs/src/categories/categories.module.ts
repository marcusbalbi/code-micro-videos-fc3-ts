import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {
  CreateCategoryUseCase,
  ListCategoriesUseCase,
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
  ],
})
export class CategoriesModule {}
