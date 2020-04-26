import express from 'express';
import compression from 'compression';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(compression());

export default app;