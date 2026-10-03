const express = require("express");
const i18next = require("i18next");
const backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
const bookRoutes = require("./routes/books.routes");




i18next.use(backend).use(middleware.LanguageDetector).init({
  fallbackLng: "en",
  backend: {
    loadPath: "./locales/{{lng}}.json",
  },
});

app.use(middleware.handle(i18next));

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
