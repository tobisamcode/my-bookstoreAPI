const mongoose = require("mongoose");

const { Schema } = mongoose;

// instantiate the schema
const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  author: {
    type: String
  },

  shortDescription: {
    type: String,
    required: true
  },

  longDescription: {
    type: String,
    required: false
  },

  year: {
    type: Number,
    required: true,
    max: [2022, "year must be less than or equal to 2022"]
  },

  isbn: {
    type: String,
    required: true,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
