const express = require('express');

const BookCtrl = require('../controllers/BookCtrl.js');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', BookCtrl.getBooks);

router.get('/bestrating', auth, BookCtrl.bestRating);

router.get('/:id', auth, BookCtrl.getBook);

router.post('/', auth, BookCtrl.createBook);

router.put('/:id', auth, BookCtrl.updateBook);

router.delete('/:id', auth, BookCtrl.deleteBook);

router.post('/:id/rating', auth, BookCtrl.rating);

module.exports = router;
