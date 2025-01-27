const mongoose = require("mongoose");
const books = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    ratings: {
        type: [
          {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
              required: true,
            },
            rating: {
              type: Number,
              min: 1,
              max: 5,
              required: true,
            },
          },
        ],
        default: [], // Default to an empty array
      },
      reviews: {
        type: [
          {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
              required: true,
            },
            review: {
              type: String,
              required: true,
            },
          },
        ],
        default: [], // Default to an empty array
      },
    },      
    {timestamps: true} //sort orders based on time
);

module.exports = mongoose.model("books",books);