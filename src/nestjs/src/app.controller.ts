import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCategoryUseCase } from '@balbi/core/category/application';
import { CategoryInMemoryRepository } from '@balbi/core/category/infra';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const repo = new CategoryInMemoryRepository();
    const usecase = new CreateCategoryUseCase(repo);
    usecase.execute({ name: 'ola' });
    return this.appService.getHello();
  }
}
