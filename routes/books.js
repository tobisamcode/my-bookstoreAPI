const express = require("express");
const bookModel = require("../models/book.model");
const bookValidatorMiddleWare = require("../validators/book.validator");
const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {
  try {
    const books = await bookModel.find();
    res.send(books);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

bookRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await bookModel.findById(id);
    res.status(200).send(book);
  } catch (error) {
    console.log(error);

    res.status(404).send(error);
  }
});

bookRouter.post("/", bookValidatorMiddleWare, async (req, res) => {
  const book = req.body;

  try {
    const newBook = await bookModel.create(book);
    res.status(200).send(newBook);
  } catch (error) {
    console.log(error);

    res.status(404).send(error);
  }
});

bookRouter.put("/:id", bookValidatorMiddleWare, async (req, res) => {
  const id = req.params.id;
  const book_to_be_updated = req.body;
  book.updatedAt = new Date();

  try {
    const updatedBook = await bookModel.findByIdAndUpdate(id, book, {
      new: true
    });

    res.status(200).send(updatedBook);
  } catch (error) {
    console.log(error);

    res.status(404).send(error);
  }
});

bookRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBook = await bookModel.findByIdAndRemove(id);

    res.status(200).json(deletedBook, "book deleted successfully");
  } catch (error) {
    console.log(error);

    res.status(404).send(error);
  }
});

module.exports = bookRouter;
