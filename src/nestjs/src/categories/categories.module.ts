import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {
  CATEGORY_IN_MEMORY_REPOSITORY,
  CREATE_CATEGORY_USE_CASE,
  GET_CATEGORY_USE_CASE,
  LIST_CATEGORIES_USE_CASE,
  REMOVE_CATEGORY_USE_CASE,
  UPDATE_CATEGORY_USE_CASE,
} from './category.providers';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CATEGORY_IN_MEMORY_REPOSITORY,
    CREATE_CATEGORY_USE_CASE,
    LIST_CATEGORIES_USE_CASE,
    UPDATE_CATEGORY_USE_CASE,
    GET_CATEGORY_USE_CASE,
    REMOVE_CATEGORY_USE_CASE,
  ],
})
export class CategoriesModule {}
