const bookModel = require("../models/book.model");
const {
  AddBookValidationMiddleWare,
  UpdateBookValidationMiddleWare
} = require("../validators/book.validator");

const getAllBooks = async (req, res) => {
  try {
    const books = await (await bookModel.find()).reverse();
    res.send(books);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await bookModel.findById(id);
    res.status(200).send(book);
  } catch (error) {
    console.log(error);

    res.status(404).send(error);
  }
};

const addBook =
  (AddBookValidationMiddleWare,
  async (req, res) => {
    const book = req.body;

    try {
      const newBook = await bookModel.create(book);
      res.status(200).send(newBook);
    } catch (error) {
      console.log(error);

      res.status(404).send(error);
    }
  });

const updateBook =
  (UpdateBookValidationMiddleWare,
  async (req, res) => {
    const id = req.params.id;
    const book_to_be_updated = req.body;
    book_to_be_updated.updatedAt = Date.now();

    try {
      const updatedBook = await bookModel.findByIdAndUpdate(
        id,
        book_to_be_updated,
        {
          new: true
        }
      );

      res.status(200).send(updatedBook);
    } catch (error) {
      console.log(error);

      res.status(404).send(error);
    }
  });

const deleteBook = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBook = await bookModel.findByIdAndDelete(id);

    res.status(200).json({ message: "book deleted successfully" });
  } catch (error) {
    console.log(error);

    res.status(404).send(error);
  }
};

module.exports = {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook
};
