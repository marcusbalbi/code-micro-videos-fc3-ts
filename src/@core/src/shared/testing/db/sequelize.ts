import { Sequelize, SequelizeOptions } from "sequelize-typescript";

export function setupSequelize(pOtions: SequelizeOptions = {}) {
  let sequelize: Sequelize;
  const options: SequelizeOptions = {
    dialect: "sqlite",
    host: ":memory:",
    logging: false,
    ...pOtions,
  };
  beforeAll(() => {
    sequelize = new Sequelize(options);
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  return {sequelize};
}