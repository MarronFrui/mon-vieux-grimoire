import Thing from '../models/Thing.ts';
import fs from 'node:fs';
import type { RequestHandler } from 'express';

export const createBook: RequestHandler = (req, res, _next) => {
  if (req.auth === undefined) return;
  if (req.file === undefined) return res.status(400).json({ error: 'Image manquante' });
  const thingObject = JSON.parse(req.body.book);
  delete thingObject._id;
  delete thingObject._userId;
  const book = new Thing({
    ...thingObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré' }))
    .catch((error) => res.status(400).json({ error }));
};

export const getBooks: RequestHandler = (_req, res, _next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};

export const getBook: RequestHandler = (req, res, _next) => {
  Thing.findOne({ _id: req.params['id'] })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

export const updateBook: RequestHandler = (req, res, _next) => {
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };

  delete thingObject._userId; //Make sure user doesn't try to edit userId on the item
  Thing.findOne({ _id: req.params['id'] })
    .then((thing) => {
      if (req.auth === undefined) return;
      if (thing.userId != req.auth.userId) {
        res.status(400).json({ error });
      } else {
        Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

export const deleteBook: RequestHandler = (req, res, _next) => {
  Thing.findOne({ _id: req.params['id'] })
    .then((thing) => {
      if (req.auth === undefined) return;
      if (thing.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' });
      } else {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params['id'] })
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch((error) => res.status((401).json({ error })));
        });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

export const setRating: RequestHandler = (req, res, _next) => {
  Thing.findOne({ _id: req.params['id'] }, 'averageRating')
    .then((thing) => {
      if (!thing) return res.status(404).json({ error: 'Book not found' });
      res.status(200).json({ rating: thing.averageRating });
    })
    .catch((error) => res.status(400).json({ error }));
};

export const getBestRating: RequestHandler = (_req, res, _next) => {
  Thing.find()
    .sort({ rating: -1 })
    .limit(3)
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};
