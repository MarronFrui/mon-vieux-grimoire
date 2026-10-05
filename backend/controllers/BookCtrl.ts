import Book from '../models/Book.ts';
import fs from 'node:fs';
import type { RequestHandler } from 'express';

export const createBook: RequestHandler = (req, res, _next) => {
  if (req.auth === undefined) {
    res.status(400).json({ error: 'Bad request' });
    return;
  }
  if (req.file === undefined) return res.status(400).json({ error: 'Image manquante' });

  const requestedBook = JSON.parse(req.body.book);
  delete requestedBook._id;
  delete requestedBook._userId;
  const book = new Book({
    ...requestedBook,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré' }))
    .catch((error) => res.status(400).json({ error }));
};

export const getBooks: RequestHandler = (_req, res, _next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

export const getBook: RequestHandler = (req, res, _next) => {
  Book.findOne({ _id: req.params['id'] })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

export const updateBook: RequestHandler = (req, res, _next) => {
  const requestedBook = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };

  delete requestedBook._userId; //Make sure user doesn't try to edit userId on the item

  Book.findOne({ _id: req.params['id'] })
    .then((book) => {
      if (req.auth === undefined) {
        res.status(400).json({ error: 'Bad request' });
        return;
      }
      if (book !== null && book.userId !== req.auth.userId) {
        res.status(400).json({ error: 'Book not found' });
      } else {
        Book.updateOne({ _id: req.params['id'] }, { ...requestedBook, _id: req.params['id'] })
          .then(() => res.status(200).json({ message: 'Objet modifié!' })) // TODO : Need to delete old image if updated
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

export const deleteBook: RequestHandler = (req, res, _next) => {
  Book.findOne({ _id: req.params['id'] })
    .then((book) => {
      if (req.auth === undefined) {
        res.status(400).json({ error: 'Bad request' });
        return;
      }
      if (book === null) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }

      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' });
        return;
      }

      const filename = book.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Book.deleteOne({ _id: req.params['id'] })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch((error) => res.status(401).json({ error }));
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

export const computeAverageRating = (existingRatings: { grade: number; userId: string }[]) => {
  const sum = existingRatings.reduce((total, element) => total + element.grade, 0);
  const average = sum / existingRatings.length;
  return average;
};

export const setRating: RequestHandler = (req, res, _next) => {
  if (req.auth === undefined) return res.status(401).json({ error: 'Unauthorized' });
  const { userId } = req.auth;

  Book.findOne({ _id: req.params['id'] }, 'ratings')
    .then((book) => {
      if (!book) return res.status(404).json({ error: 'Book not found' });

      if (book.ratings.some((rating) => rating.userId === userId)) {
        res.status(400).json({ error: 'Vous ne pouvez pas noter deux fois le même livre' });
        return;
      }

      const grade: number = req.body.rating;
      if (grade < 0 || grade > 5 || typeof grade !== 'number')
        return res.status(400).json({ error: 'Donnez une note valide' });

      book.ratings.push({ userId, grade });
      book.averageRating = computeAverageRating(book.ratings);
      book
        .save()
        .then((updatedBook) => res.status(200).json(updatedBook))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

export const getBestRating: RequestHandler = (_req, res, _next) => {
  Book.find()
    .sort({ rating: -1 })
    .limit(3)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};
