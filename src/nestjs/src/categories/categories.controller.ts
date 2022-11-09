import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  RemoveCategoryUseCase,
  UpdateCategoryUseCase,
} from '@balbi/core/category/application';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase)
  private createCategory: CreateCategoryUseCase;
  @Inject(ListCategoriesUseCase)
  private listCategories: ListCategoriesUseCase;
  @Inject(UpdateCategoryUseCase)
  private updateCategory: UpdateCategoryUseCase;
  @Inject(GetCategoryUseCase)
  private getCategory: GetCategoryUseCase;
  @Inject(RemoveCategoryUseCase)
  private removeCategory: RemoveCategoryUseCase;

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategory.execute(createCategoryDto);
  }

  @Get()
  search(@Query() searchParams: SearchCategoryDto) {
    return this.listCategories.execute(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getCategory.execute({ id });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    this.updateCategory.execute({ id, ...updateCategoryDto });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeCategory.execute({ id });
  }
}
