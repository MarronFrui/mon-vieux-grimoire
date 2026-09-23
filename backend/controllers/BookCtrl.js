const Thing = require('../models/Thing.js');

module.exports = {
  createBook: function (req, res, _next) {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing({
      ...thingObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    thing
      .save()
      .then(() => res.status(201).json({ message: 'Objet enregistré' }))
      .catch((error) => res.status(400).json({ error }));
  },

  getBooks: function (_req, res, _next) {
    Thing.find()
      .then((things) => res.status(200).json(things))
      .catch((error) => res.status(400).json({ error }));
  },

  getBook: function (req, res, _next) {
    Thing.findOne({ _id: req.params.id })
      .then((thing) => res.status(200).json(thing))
      .catch((error) => res.status(404).json({ error }));
  },

  updateBook: function (req, res, _next) {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !' }))
      .catch((error) => res.status(400).json({ error }));
  },

  deleteBook: function (req, res, _next) {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
      .catch((error) => res.status(400).json({ error }));
  },

  rating: function (req, res, _next) {
    Thing.findOne({ _id: req.params.id }, 'rating')
      .then((thing) => {
        if (!thing) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json({ rating: thing.averageRating });
      })
      .catch((error) => res.status(400).json({ error }));
  },

  bestRating: function (_req, res, _next) {
    Thing.find()
      .sort({ rating: -1 })
      .limit(3)
      .then((things) => res.status(200).json(things))
      .catch((error) => res.status(400).json({ error }));
  },
};
