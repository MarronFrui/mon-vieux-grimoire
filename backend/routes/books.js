const express = require('express');

const CreateBookCtrl = require('../controler/createBook.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  const books = [
    {
      _id: '1',
      userId: 'clc4wj5lh3gyi0ak4eq4n8syr',
      title: 'Milwaukee Mission',
      author: 'Elder Cooper',
      imageUrl: 'https://via.placeholder.com/206x260',
      year: 2021,
      genre: 'Policier',
      ratings: [
        {
          userId: '1',
          grade: 5,
        },
        {
          userId: '1',
          grade: 5,
        },
        {
          userId: 'clc4wj5lh3gyi0ak4eq4n8syr',
          grade: 5,
        },
        {
          userId: '1',
          grade: 5,
        },
      ],
      averageRating: 3,
    },
    {
      _id: '2',
      userId: 'clbxs3tag6jkr0biul4trzbrv',
      title: 'Book for Esther',
      author: 'Alabaster',
      imageUrl: 'https://via.placeholder.com/206x260',
      year: 2022,
      genre: 'Paysage',
      ratings: [
        {
          userId: 'clbxs3tag6jkr0biul4trzbrv',
          grade: 4,
        },
        {
          userId: '1',
          grade: 5,
        },
        {
          userId: '1',
          grade: 5,
        },
        {
          userId: '1',
          grade: 5,
        },
      ],
      averageRating: 4.2,
    },
  ]; //Temp hardcoded books (will fetch from the dB in the future)
  res.status(200).json(books);
  next();
});

router.get('/bestrating', (req, res, next) => {
  // TODO: array of top 3 — must stay ABOVE /:id
});

router.get('/:id', (req, res, next) => {
  console.log('Test param: ' + req.params.id); // "Test param: foo"
});

//router.post('/', middleware,  (CreateBookCtrl.CreateBook())

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
