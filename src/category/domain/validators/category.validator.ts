import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ClassValidatorField } from "../../../shared/validators/class-validator-fields";
import { CategoryProps } from "../entities/category";

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ name, created_at, description, is_active }: CategoryProps) {
    Object.assign(this, { name, created_at, description, is_active });
  }
}

export class CategoryValidator extends ClassValidatorField<CategoryRules> {
  validate(data: CategoryProps): boolean {
      return super.validate(new CategoryRules(data))
  }
}

export default class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
