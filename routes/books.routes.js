const express = require("express");
const Bookmodel = require("../models/Book.model");

const {
  idValidation,
  createBookValidation,
  updateBookValidation,
  handleValidationErrors,
} = require("../validators/book.validator");

const router = express.Router();

router.post(
  "/",
  createBookValidation,
  handleValidationErrors,

  async (req, res) => {
    try {
      const NewBook = await BookModel.create(req.body);
      res.status(201).json(NewBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

router.get("/", async (req, res) => {
  try {
    const bookList = await BookModel.find();
    res.status(200).send(bookList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id",
idValidation, handleValidationErrors
, async (req, res) => {
  try {
    const { id } = req.params;

    const book = await BookModel.findById(id);
    res.status(200).json(book);

    if (!Book) {
      return res.status(404).json({ message: req.t("bookNotFound") });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", 
idValidation, handleValidationErrors,
  async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await BookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: req.t("bookNotFound") });
    }

    res.status(200).json({ message: req.t("bookDeletedSuccessfully") });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put(
  "/:id",
  idValidation,
  updateBookValidation,
  handleValidationErrors,

  async (req, res) => {
    try {
      const { id } = req.params;
      const UpdatedBook = await BookModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!UpdatedBook) {
        return res.status(404).json({ message: req.t("bookNotFound")});
      }

      res
        .status(200)
        .json({ message: req.t("bookUpdatedSuccessfully"), UpdatedBook });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

module.exports = router;
