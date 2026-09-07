const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/books', (req, res, next) => {
  const books = [
    {
      title: 'book1',
    },
    {
      title: 'book2',
    },
  ];
  res.locals.someKey = 'Requete reçue !';
  res.status(200).json(books);
  next();
});

app.use((req, res, next) => {
  res.status(201);
  res.json({ message: `${res.locals.someKey}` });
  next();
});

module.exports = app;
