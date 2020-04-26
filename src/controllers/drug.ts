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
            name: {[Op.substring]: `${drugnStart}`}
          }
        });
        resolve(drugs);
      } catch (error) {
        reject([]);
      }
    });
  }

}

export default new DrugController;