module.exports = function createBook(req, res, next) {
  const Thing = require('./models/Thing');
  const thing = new Thing({
    ...req.body,
  });
  return;
};
