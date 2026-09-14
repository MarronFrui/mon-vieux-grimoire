const express = require('express');

const BookCtrl = require('../controllers/BookCtrl.js');
const router = express.Router();

router.get('/', BookCtrl.getBooks);

router.get('/bestrating', (req, res, next) => {
  // TODO: array of top 3 — must stay ABOVE /:id
});

router.get('/:id', BookCtrl.getBook);

router.post('/', BookCtrl.createBook);

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
