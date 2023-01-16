
export interface Model {
  create: (data?: any) => void
}
export class ModelFactory {
  constructor (private model: Model, private factoryProps: () => any) {

  }
  async create(data?) {
    this.model.create(data || this.factoryProps());
  }
  make() {}
  async bulkCreate() {}
  async bulkMake() {}
}
