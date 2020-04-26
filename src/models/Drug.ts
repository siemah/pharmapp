
import { Model, DataTypes, } from 'sequelize';
import sequelize from '../config/db';



class Drug extends Model {

  public id!: number;
  public uuid!: string; 
  public name!: string;
  public barecode!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Drug.init({
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
  barecode: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  tableName: 'drugs',
  sequelize: sequelize, // this bit is important
});

Drug.sync({});

export default Drug;