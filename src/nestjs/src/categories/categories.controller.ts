import {
  CreateCategoryUseCase,
  ListCategoriesUseCase,
} from '@balbi/core/category/application';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase)
  private readonly createCategory: CreateCategoryUseCase;
  @Inject(ListCategoriesUseCase)
  private readonly listCategories: ListCategoriesUseCase;

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategory.execute({ name: 'jhon' });
  }

  @Get()
  findAll() {
    return this.listCategories.execute({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
