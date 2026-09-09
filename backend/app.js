require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const app = express();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.URL_MONGOSE_API, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

//Handle CORS issues
app.use((req, res, next) => {
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

module.exports = app;
