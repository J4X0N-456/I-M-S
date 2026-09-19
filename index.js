const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
});

BookModel = mongoose.model("Book", bookSchema);

app.post("/books", async (req, res) => {
  try {
    const NewBook = await BookModel.create(req.body);
    res.status(201).json(NewBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const bookList = await BookModel.find();
    res.status(200).send(bookList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/books/:id", async (req, res) => {
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

app.delete("/books/:id", async (req, res) => {
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

app.put("/books/:id", async (req, res) => {
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




app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const connectionString = process.env.CONNECT_STRING;

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));
