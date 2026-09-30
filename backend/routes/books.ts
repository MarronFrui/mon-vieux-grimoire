import express from 'express';

import * as BookCtrl from '../controllers/BookCtrl.ts';
import { auth } from '../middleware/auth.ts';
import multer from '../middleware/multer-config.ts';

const router = express.Router();

router.get('/', BookCtrl.getBooks);

router.get('/bestrating', BookCtrl.getBestRating);

router.get('/:id', BookCtrl.getBook);

router.post('/', auth, multer, BookCtrl.createBook);

router.put('/:id', auth, multer, BookCtrl.updateBook);

router.delete('/:id', auth, BookCtrl.deleteBook);

router.post('/:id/rating', auth, BookCtrl.setRating);

export default router;
