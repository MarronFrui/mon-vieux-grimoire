const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.locals.someKey = 'Requete reçue !';
  next();
});

app.use((req, res, next) => {
  res.status(201);
  res.json({ message: `${res.locals.someKey}` });
  next();
});

app.use((req, res) => {
  return;
});

module.exports = app;
