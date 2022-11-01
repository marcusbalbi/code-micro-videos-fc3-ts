import Entity from "#core/shared/domain/entities/entity";
import UniqueEntityId from "#core/shared/domain/value-objects/unique-entity-id";
import { EntityValidationError } from "#core/shared/errors/validation-error";
import { CategoryValidatorFactory } from "#core/category/domain/validators/category.validator";

export type CategoryProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
export class Category extends Entity<CategoryProps> {
  constructor(readonly props: CategoryProps, id?: UniqueEntityId) {
    super(props, id);
    Category.validate(props);
    this.props.is_active = props.is_active ?? true;
    this.props.created_at = props.created_at ?? new Date();
  }

  update(name: string, description?: string) {
    Category.validate({ name, description });
    this.name = name;
    this.description = description;
  }

  // static validate(props: Omit<CategoryProps, 'created_at'>) {
  //   ValidatorRules.values(props.name, "name").required().string().maxLength(255);
  //   ValidatorRules.values(props.description, "description").string();
  //   ValidatorRules.values(props.is_active, "is_active").bool();
  // }

  static validate(props: CategoryProps) {
    const validator = CategoryValidatorFactory.create();
    validator.validate(props);
    if (!validator.isValid()) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  private set description(value: string | undefined) {
    this.props.description = value;
  }

  get is_active () {
    return this.props.is_active;
  }
  get created_at () {
    return this.props.created_at;
  }

  activate() {
    this.props.is_active = true;
  }
  deactivate() {
    this.props.is_active = false;
  }
}
