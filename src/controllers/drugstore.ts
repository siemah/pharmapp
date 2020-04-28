import _db from '../config/db';
import DrugStore from '../models/Drugstore';

interface StoreDrugAssoc {
  phone_number: string;
  drug_name: string;
}
interface DrugStoreObject {
  phone_number: string;
  latitude: string;
  longitude: string;
  name: string;
}
class DrugStoreController {

  addNew(data: DrugStoreObject): Promise<boolean> {
    return new Promise( async (res, rej) => {
      try {
        const _response = await DrugStore.create(data);
        res(_response.id ? true : false);
      } catch (error) {
        rej(false);
      }
    });
  }

  /**
   * find nearest drugstore who has drug
   * @param lat latitud
   * @param lng longitude
   * @param drug drug_id
   */
  async findNearestStore(lat: string, lng: string, drug: string, maxDistance: number): Promise<StoreDrugAssoc|null> {
    const sql = `
      SELECT 
        phone_number,
        drugs.name as drug_name,
        SQRT(
          POW(69.1 * (latitude - :lat), 2) +
          POW(69.1 * (:lng - longitude) * COS(:lat / 57.3), 2)
        ) AS distance
          
      FROM drugstores, storesdrugsassocs, drugs
      
      WHERE
        storesdrugsassocs.drug_id = :drug AND
        storesdrugsassocs.drugstore_id = drugstores.id AND
        storesdrugsassocs.drug_id = drugs.id
      
      HAVING distance <= :maxDistance 
      
      ORDER BY distance
      
      LIMIT 1;
    `;
    return new Promise(async (resolve, reject) => {
      try {
        let _store = await _db.query(sql, {
          replacements: { lat, lng, drug, maxDistance },
          nest: true,
          plain: true,
        });
        if(_store) {
          resolve({
            phone_number: _store.phone_number as string,
            drug_name: _store.drug_name as string,
          });
        }
        resolve(null);
      } catch (error) {
        reject(error);
      }
    });
  }

}

export default new DrugStoreController;