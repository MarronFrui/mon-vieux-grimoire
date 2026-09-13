const express = require('express');

const CreateBookCtrl = require('../controler/createBook.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
  res.status(200).json(books);
  next();
});

router.get('/bestrating', (req, res, next) => {
  // TODO: array of top 3 — must stay ABOVE /:id
});

router.get('/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

router.post('/', CreateBookCtrl.createBook);

router.put('/:id', (req, res, next) => {
  // TODO: JSON body OR { book: string, image: file } → { message }
});

router.delete('/:id', (req, res, next) => {
  // TODO: delete book + image file → { message }
});

router.post('/:id/rating', (req, res, next) => {
  // TODO: { userId, rating } → updated book
});

module.exports = router;
