import { InputUpdateCategoryUseCase } from '@balbi/core/category/application';

export class UpdateCategoryDto
  implements Omit<InputUpdateCategoryUseCase, 'id'>
{
  name: string;
  description?: string;
  is_active?: boolean;
}
