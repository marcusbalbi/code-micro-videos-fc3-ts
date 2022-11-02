import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { CreateCategoryUseCase } from '@balbi/core/category/application';
// import { CategoryInMemoryRepository } from '@balbi/core/dist/category/infra/repository';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // const c = new CreateCategoryUseCase(new CategoryInMemoryRepository());
    // c.execute({ name: 'j' });
    return this.appService.getHello();
  }
}
