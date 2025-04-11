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
    stock: {
      type: Number,
      required: true,
  },
  quantity: {
    type: Number,
    required: false,
},
    desc: {
        type: String,
        required: true,
    },
    category: {
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
              required: false,
            },
            rating: {
              type: Number,
              min: 1,
              max: 5,
              required: false,
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
              required: false,
            },
            review: {
              type: String,
              required: false,
            },
          },
        ],
        default: [], // Default to an empty array
      },
    },      
    {timestamps: true} //sort orders based on time
);

module.exports = mongoose.model("books",books);