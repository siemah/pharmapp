import { Application, Request, Response } from "express";
import { errorHandler } from "./middleware";

export default function routesLoader(app: Application) {
  app.get('/', (req, res, next) => {
    res.render('index', {
      title: 'Drugmapp',
    });
  });
  app.use(errorHandler);
};