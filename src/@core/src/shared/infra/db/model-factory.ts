
export interface Model {
  create: (data?: any) => Promise<any>;
  build: (data?: any) => any;
  bulkCreate: (data: any[]) => Promise<any>;
}
export class ModelFactory {
  private _count = 1;

  constructor(private model: Model, private factoryProps: () => any) {}

  count(c: number) {
    this._count = c;
    return this;
  }

  async create(data?) {
    return this.model.create(data || this.factoryProps());
  }
  make(data?: any) {
    return this.model.build(data || this.factoryProps());
  }
  async bulkCreate(customFactoryProps?: (index: number) => any) {
    const data = new Array(this._count)
      .fill(customFactoryProps ? customFactoryProps : this.factoryProps)
      .map((factory, index) => factory(index));
    return this.model.bulkCreate(data);
  }
  async bulkMake() {}
}
