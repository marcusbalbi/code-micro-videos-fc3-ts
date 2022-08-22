export type CategoryProps = {
  name: string;
  description: string;
  is_active?: boolean;
  created_at?: Date;
};
export class Category {
  private is_active: boolean;
  private created_at: Date;
  private description: string | null;

  constructor(readonly name: string, description: string | null = null) {
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
    cat.is_active = props.is_active || false;
    cat.created_at = props.created_at || new Date();
    return cat;
  }
}
