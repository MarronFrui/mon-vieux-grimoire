import 'dotenv/config';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.ts';
import booksRoutes from './routes/books.ts';

// ESM has no __dirname, we rebuild it from this file's own URL
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

if (process.env['URL_MONGOSE_API'] === undefined) {
  console.log('Connexion à MongoDB échouée !');
  process.exit(1);
}

mongoose
  .connect(process.env['URL_MONGOSE_API'])
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(morgan('tiny'));

//Handle CORS issues
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

export default app;
