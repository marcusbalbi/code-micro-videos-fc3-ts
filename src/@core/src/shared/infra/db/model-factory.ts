
export interface Model {
  create: (data?: any) => Promise<any>;
  build: (data?: any) => any;
  bulkCreate: (data: any[]) => Promise<any>;
  bulkBuild: (data: any[]) => any;
}
export class ModelFactory<ModelProps = any> {
  private _count = 1;

  constructor(private model: Model, private factoryProps: () => ModelProps) {}

  count(c: number) {
    this._count = c;
    return this;
  }

  async create(data?: ModelProps): Promise<any> {
    return this.model.create(data || this.factoryProps());
  }
  make(data?: ModelProps): any {
    return this.model.build(data || this.factoryProps());
  }
  async bulkCreate(customFactoryProps?: (index: number) => ModelProps): Promise<any[]> {
    const data = new Array(this._count)
      .fill(customFactoryProps ? customFactoryProps : this.factoryProps)
      .map((factory, index) => factory(index));
    return this.model.bulkCreate(data);
  }
  bulkMake(customFactoryProps?: (index: number) => ModelProps): any[] {
    const data = new Array(this._count)
      .fill(customFactoryProps ? customFactoryProps : this.factoryProps)
      .map((factory, index) => factory(index));
    return this.model.bulkBuild(data);
  }
}
