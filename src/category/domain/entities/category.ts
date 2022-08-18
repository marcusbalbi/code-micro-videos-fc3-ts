
export type CategoryProps = {
  name: string;
  description: string;
  is_active?: boolean;
  created_at?: Date;
};
export class Category {
  private is_active: boolean;
  private created_at: Date | null;

  constructor(readonly name: string, readonly description: string) {
    this.is_active = true;
    this.created_at = new Date();
  }

  active (): boolean {
    return this.is_active;
  }

  public static createFromProps(props: CategoryProps): Category {
    const cat = new Category(props.name, props.description);
    cat.is_active = props.is_active || false;
    cat.created_at = props.created_at || null;
    return cat;
  }
}
