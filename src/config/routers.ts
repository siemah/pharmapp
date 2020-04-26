import { Application, Request, Response } from "express";
import { errorHandler } from "./middleware";
import DrugController from "../controllers/drug";
import DrugStore from "../models/Drugstore";
import drugslist from "./drugslist";
import Drug from "../models/Drug";

export default function routesLoader(app: Application) {
  app.get('/', (req, res, next) => {
    res.render('index', {
      title: 'Drugmapp',
    });
  });
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
        const longitude = Math.floor(Math.random() * (10 - -7 + 1) + -7);
        const latitude = Math.floor(Math.random() * (36 - 19 + 1) + 19);
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
  app.use(errorHandler);
};