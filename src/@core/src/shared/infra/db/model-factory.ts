export class ModelFactory {
  constructor (private model, private factoryProps: () => any) {

  }
  async create(data?) {
    this.model.create(data || this.factoryProps());
  }
  make() {}
  async bulkCreate() {}
  async bulkMake() {}
}
