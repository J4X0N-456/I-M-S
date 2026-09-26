const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
const bookRoutes = require("./routes/books.routes");

app.use(express.json());
app.use("/books", bookRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const connectionString = process.env.CONNECT_STRING;

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));
