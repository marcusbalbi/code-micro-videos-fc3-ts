import Entity from "../../../shared/domain/entities/entity";
import UniqueEntityId from "../../../shared/domain/value-objects/unique-entity-id";

export type CategoryProps = {
  id?: string;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
export class Category extends Entity {
  private is_active: boolean;
  private created_at: Date;
  private description: string | null;

  constructor(readonly name: string, description: string | null = null) {
    super();
    this.is_active = true;
    this.created_at = new Date();
    this.description = description ?? null;
  }

  getActive(): boolean {
    return this.is_active;
  }

  getCreatedAt(): Date {
    return this.created_at;
  }

  getDescription(): string | null {
    return this.description;
  }

  public static createFromProps(props: CategoryProps): Category {
    const cat = new Category(props.name, props.description);
    if (props.id) {
      cat.id = new UniqueEntityId(props.id);
    }
    if (typeof props.is_active === "boolean") {
      cat.is_active = props.is_active;
    }
    if (props.created_at) {
      cat.created_at = props.created_at;
    }
    return cat;
  }
}
