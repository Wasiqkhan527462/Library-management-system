const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  totalQuantity: { type: Number, required: true, default: 1 }, // Total quantity of the book
  availableQuantity: { type: Number, required: true, default: 1 }, // Available copies of the book
});

module.exports = mongoose.model("Book", bookSchema);
