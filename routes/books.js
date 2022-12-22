const express = require("express");
const bookRouter = express.Router();

const {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook
} = require("../controllers/books.controller");

bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBook);

bookRouter.post("/", addBook);

bookRouter.put("/:id", updateBook);

bookRouter.delete("/:id", deleteBook);

module.exports = bookRouter;
