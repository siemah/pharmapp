import express from 'express';

import routesLoader from './config/routers';
import middlewaresLoader from './config/middleware';

const app = express();

middlewaresLoader(app);
routesLoader(app);

export default app;