import { Sequelize, SequelizeOptions } from "sequelize-typescript";

export function setupSequelize(pOtions: SequelizeOptions = {}) {
  let _sequelize: Sequelize;
  const options: SequelizeOptions = {
    dialect: "sqlite",
    host: ":memory:",
    logging: false,
    ...pOtions,
  };
  beforeAll(() => {
    _sequelize = new Sequelize(options);
  });

  beforeEach(async () => {
    await _sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await _sequelize.close();
  });

  return {
    get sequelize() {
      return _sequelize;
    }
  };
}