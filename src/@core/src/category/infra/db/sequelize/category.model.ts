import { ModelFactory } from "#core/shared/infra/db/model-factory";
import { Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";


type CategoryModelProperties = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

@Table({
  tableName: 'categories',
  timestamps: false,
})
export class CategoryModel extends Model<CategoryModelProperties> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  name: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  description: string | null;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  is_active: boolean;

  @Column({ allowNull: false, type: DataType.DATE })
  created_at: Date;

  static factory() {
    const chance: Chance.Chance = require('chance')();
    return new ModelFactory(CategoryModel, () => ({
      id: chance.guid({ version: 4 }),
      name: chance.name(),
      description: chance.paragraph(),
      is_active: true,
      created_at: chance.date(),
    }));
  }
}
