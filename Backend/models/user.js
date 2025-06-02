const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9R-Bg8Q9cjWzQtLgYFbXERHFJ_S7PsxrqQV8Ouv1UCJMMpe0kFZVS3NoA7CGuA_Pr3LM&usqp=CAU",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user" , "admin"],
    },
    favourites: [{
        type: mongoose.Types.ObjectId,
        ref: "books",
    }],
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: "books",
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "order",
    }],
    ratings: [
      {
        book: {
          type: mongoose.Types.ObjectId,
          ref: "books",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        }
      
    }],
    reviews: [
      {
        book: {
          type: mongoose.Types.ObjectId,
          ref: "books",
          required: true,
        },
        review: {
          type: String,
          required: true,
        }
      
    }],
},
{timestamps: true}
);

module.exports = mongoose.model("user", user);
