const express = require('express');

const BookCtrl = require('../controllers/BookCtrl.js');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config.js');

router.get('/', BookCtrl.getBooks);

router.get('/bestrating', BookCtrl.bestRating);

router.get('/:id', BookCtrl.getBook);

router.post('/', auth, multer, BookCtrl.createBook);

router.put('/:id', auth, multer, BookCtrl.updateBook);

router.delete('/:id', auth, BookCtrl.deleteBook);

router.post('/:id/rating', auth, BookCtrl.rating);

module.exports = router;
