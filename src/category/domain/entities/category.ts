import Entity from "../../../shared/domain/entities/entity";
import UniqueEntityId from "../../../shared/domain/value-objects/unique-entity-id";

export type CategoryProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
export class Category extends Entity<CategoryProps> {
  constructor(readonly props: CategoryProps, id?: UniqueEntityId) {
    super(props, id);
    this.props.is_active = props.is_active ?? true;
    this.props.created_at = props.created_at ?? new Date();
  }

  update(name: string, description: string) {
    this.name = name;
    this.description = description;
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

  activate() {
    this.props.is_active = true;
  }
  deactivate() {
    this.props.is_active = false;
  }
}
