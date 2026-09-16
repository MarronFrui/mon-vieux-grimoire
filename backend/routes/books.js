const express = require('express');

const BookCtrl = require('../controllers/BookCtrl.js');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', BookCtrl.getBooks);

router.get('/bestrating', (req, res, next) => {
  // TODO: array of top 3 — must stay ABOVE /:id
});

router.get('/:id', auth, BookCtrl.getBook);

router.post('/', auth, BookCtrl.createBook);

router.put('/:id', auth, BookCtrl.updateBook);

router.delete('/:id', auth, BookCtrl.deleteBook);

router.post('/:id/rating', (req, res, next) => {
  // TODO: { userId, rating } → updated book
});

module.exports = router;
