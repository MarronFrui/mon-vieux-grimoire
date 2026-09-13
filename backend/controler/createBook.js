module.exports = function createBook(req, res, next) {
  const Thing = require('./models/Thing');
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.satus(201).json({ message: 'Objet enregistré' }))
    .catch((error) => res.status(400).json({ error }));
};
