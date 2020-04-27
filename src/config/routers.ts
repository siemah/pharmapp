import { Application, } from "express";
import { errorHandler } from "./middleware";
import DrugController from "../controllers/drug";
import DrugStore from "../models/Drugstore";
import drugslist from "./drugslist";
import Drug from "../models/Drug";
import { randomNum } from "../helpers/tools";
import StoresDrugsAssoc from "../models/StoresDrugsAssoc";
import DrugStoreController from '../controllers/drugstore';
import Sms from '../controllers/sms';

export default function routesLoader(app: Application) {
  // home page
  app.get('/', (req, res, next) => {
    res.render('index', {
      title: 'Drugmapp',
    });
  });
  // searching for medicament
  app.get('/drugs', async (req, res, next) => {
    let drugs = [];
    let { q = '' } = req.query;
    q = q?.toString().trim();

    if (!q || !q.length) {
      return res.redirect('/');
    }
    try {
      drugs = await DrugController.findDrugsBy(q);
    } catch (error) {
      drugs = [];
    }

    res.render('drugs', {
      title: `${q} - Drugmapp`,
      drugs,
      q,
    });
  });
  // handling order submiting
  app.post('/order', async (req, res) => {
    const { lat, lng, drug } = req.body;

    if (!lat || !lng || !drug || lat.length === 0 || lng.length === 0 || drug.length === 0) {
      return res.status(400).json({
        message: 'You must fill all required fileds:) or please dont be a bad guy:('
      });
    }
    // get the nearest drugstores to user location where distance are under 16km around 10miles
    try {
      const _r = await DrugStoreController.findNearestStore(lat, lng, drug, 10);
      console.log(_r)
      if (_r?.phone_number) {
        // await Sms
        //   .buildSmsContent(_r.drug_name, lat, lng)
        //   .sendTo(_r.phone_number);
        return res.status(200).json({
          status: 'SUCCESS',
          message: 'The nearest drugstore to your location are notified to grab your medication'
        });
      }
      return res.status(400).json({
        message: 'We didn\'t find a drugstore near to you with less than 10km'
      });
    } catch ({ message }) {
      return res.status(400).json({
        message,
      });
    }
  });
  // all thos routes below are just for adding medicaments, 
  // drugstores and association between them
  app.get('/put-drugs', async (req, res) => {
    let _p: Promise<Drug>[] = [];
    try {
      drugslist.forEach(drug => {
        _p.push(Drug.create({
          name: drug,
          description: drug,
        }));
      });
      await Promise.all(_p);
      res.json('done');
    } catch (error) {
      console.log(error)
      res.end();
    }
  });

  app.get('/put-drugstores', async (req, res) => {
    let _p: Promise<DrugStore>[] = [];
    try {
      for (let i = 0; i < 90; i++) {
        const longitude = randomNum(10, -7);
        const latitude = randomNum(36, 19);
        _p.push(DrugStore.create({
          name: "pharma " + i,
          phone_number: '771356409',
          latitude,
          longitude,
        }));
      }
      await Promise.all(_p);
      res.json('done');
    } catch (error) {
      console.log(error)
      res.end();
    }
  });

  app.get('/put-drug-stores-assoc', async (req, res) => {
    let _p: Promise<StoresDrugsAssoc>[] = [];
    try {
      for (let i = 0; i < 1000; i++) {
        const drug_id = randomNum(1, 1000);
        const drugstore_id = randomNum(1, 90);
        _p.push(StoresDrugsAssoc.create({
          drug_id,
          drugstore_id,
        }));
      }
      await Promise.all(_p);
      res.json('done');
    } catch (error) {
      console.log(error)
      res.end();
    }
  });
  // handling error
  app.use(errorHandler);
};