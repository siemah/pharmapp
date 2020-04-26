
import { Model, DataTypes, } from 'sequelize';
import sequelize from '../config/db';

class StoresDrugsAssoc extends Model {

  public id!: number;
  public drug_id!: number;
  public drugstore_id!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

StoresDrugsAssoc.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  drug_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  drugstore_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  tableName: 'storesdrugsassocs',
  sequelize: sequelize, // this bit is important
});

StoresDrugsAssoc.sync({});

export default StoresDrugsAssoc;