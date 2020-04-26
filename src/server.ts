import { createServer, } from 'http';
import dotenv from 'dotenv';
dotenv.config();
import app from './app';

const PORT = process.env.PORT;

createServer(app).listen(PORT, () => {
  console.log(`runing on http://127.0.0.1:${PORT}`);
});