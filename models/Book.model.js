const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Book name is required"],
    minlength: [5, "Book name must be at least 5 characters long"],
    maxlength: [100, "Book name must be at most 100 characters long"],
  },
  countInStock: {
    type: Number,
    required: [true, "Stock count is required"],
    min: [1, "Stock count cannot be less than 1"],
    max: [255, "Stock count cannot be more than 255"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price cannot be less than $1"],
    max: [10000, "Price cannot be more than $10,000"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "",
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: "Image must be a valid URL",
    },
  },
});

bookSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bookSchema.set("toJSON", {
  virtuals: true,
});

BookModel = mongoose.model("Book", bookSchema);

module.exports = mongoose.model("Book", bookSchema);
