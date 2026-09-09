const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  ratings: [
    {
      userId: { type: String, required: true },
      grade: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Book', thingSchema);
