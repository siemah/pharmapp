
import { Model, DataTypes, } from 'sequelize';
import sequelize from '../config/db';

class DrugStore extends Model {

  public id!: number;
  public uuid!: string;
  public name!: string;
  public latitude!: number;
  public longitude!: number;
  public phone_number!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

DrugStore.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: new DataTypes.STRING(256),
    allowNull: false,
  },
  latitude: {
    type: new DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: new DataTypes.FLOAT,
    allowNull: false,
  },
  phone_number: {
    type: new DataTypes.STRING(15),
    allowNull: true,
  },
}, {
  tableName: 'drugstores',
  sequelize: sequelize, // this bit is important
});

DrugStore.sync({});

export default DrugStore;