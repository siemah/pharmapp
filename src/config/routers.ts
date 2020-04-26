import { Application, Request, Response } from "express";
import { errorHandler } from "./middleware";
import DrugController from "../controllers/drug";

export default function routesLoader(app: Application) {
  app.get('/', (req, res, next) => {
    res.render('index', {
      title: 'Drugmapp',
    });
  });
  app.get('/drugs', async (req, res, next) => {
    let drugs = [];
    let  { q='' } = req.query;
    q = q?.toString().trim();

    if(!q || !q.length) {
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
  app.use(errorHandler);
};