module.exports = {
  createBook: function (req, res, next) {
    const Thing = require('../models/Thing.js');
    delete req.body._id;
    const thing = new Thing({
      ...req.body,
    });
    thing
      .save()
      .then(() => res.status(201).json({ message: 'Objet enregistré' }))
      .catch((error) => res.status(400).json({ error }));
  },
};
