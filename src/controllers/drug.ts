import { Op, } from 'sequelize';
import Drug from "../models/Drug";

class DrugController {

  /**
   * find all drugs start with a given param
   * @param pattern drug name starting
   */
  async findDrugsBy(drugnStart: string): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let drugs = await Drug.findAll({
          where: {
            name: { [Op.startsWith]: `${drugnStart}` }
          }
        });
        resolve(drugs);
      } catch (error) {
        reject([]);
      }
    });
  }

  addNew(name: string, description: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const _response = await Drug.create({ name, description });
        resolve(_response.id ? true : false);
      } catch (error) {
        reject(false);
      }
    });
  }

}

export default new DrugController;