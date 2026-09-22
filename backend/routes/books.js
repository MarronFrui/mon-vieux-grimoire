const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './public/data/uploads/' });
const BookCtrl = require('../controllers/BookCtrl.js');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', BookCtrl.getBooks);

router.get('/bestrating', auth, BookCtrl.bestRating);

router.get('/:id', auth, BookCtrl.getBook);

router.post('/', auth, upload.single('imageUrl'), BookCtrl.createBook);

router.put('/:id', auth, BookCtrl.updateBook);

router.delete('/:id', auth, BookCtrl.deleteBook);

router.post('/:id/rating', auth, BookCtrl.rating);

module.exports = router;
