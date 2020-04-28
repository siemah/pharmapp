import express, { Application, Request, Response, NextFunction, json, urlencoded } from "express";
import helmet from "helmet";
import compression from 'compression';
import { resolve, join, } from 'path';

/**
 * not found url
 * @param req 
 * @param res 
 */
export function notFound404(req: Request, res: Response) {
  res.render('404', {
    title: 'Not Found 404'
  });
}

/**
 * error handler for express app
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (req.xhr) {
    return res.status(500).json({
      code: "FAILED",
      message: 'Something went wrong try again',
    });
  }
  res.status(500).render('404');
}

/**
 * config middlewares used by appp
 * @param app Application
 */
export default function middlewaresLoader(app: Application) {
  app.use(helmet());
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(express.static('src/public'));
  app.set('view engine', 'ejs');
  app.set('views', resolve(join(process.cwd(), 'src', 'views')));
}