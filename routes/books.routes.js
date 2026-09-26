const express = require("express")
const Bookmodel = require("../models/Book.model")

const router = express.Router()



router.post("/", async (req, res) => {
  try {
    const NewBook = await BookModel.create(req.body);
    res.status(201).json(NewBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookList = await BookModel.find();
    res.status(200).send(bookList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
try {
const {id} = req.params;

const book = await BookModel.findById(id);
res.status(200).json(book);

if (!Book) {
  return res.status(404).json({ message: "Book not found" });
}
} 

catch (error) {
  res.status(400).json({ message: error.message });
}

})

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
 const deletedBook = await BookModel.findByIdAndDelete(id);

if (!deletedBook) {
  return res.status(404).json({ message: "Book not found" });
}

    res.status(200).json({ message: "Book deleted successfully",});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
 const UpdatedBook = await BookModel.findByIdAndUpdate(id, req.body, { new: true });

if (!UpdatedBook) {
  return res.status(404).json({ message: "Book not found" });
}

    res.status(200).json({ message: "Book updated successfully", UpdatedBook });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router