import { InputUpdateCategoryUseCase } from "@balbi/core/category/application";

export class UpdateCategoryDto implements InputUpdateCategoryUseCase {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}
