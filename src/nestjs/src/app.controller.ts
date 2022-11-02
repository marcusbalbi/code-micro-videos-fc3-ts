import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Category } from '@balbi/core/dist/category/domain/entities/category';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const c = new Category({ name: 'JHgon' });
    console.log(c);
    return this.appService.getHello();
  }
}
