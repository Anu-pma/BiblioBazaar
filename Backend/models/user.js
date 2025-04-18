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
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9R-Bg8Q9cjWzQtLgYFbXERHFJ_S7PsxrqQV8Ouv1UCJMMpe0kFZVS3NoA7CGuA_Pr3LM&usqp=CAU", //deafult profile pic
    },
    role: {
        type: String,
        default: "user",
        enum: ["user" , "admin"],
    },
    favourites: [{
            type: mongoose.Types.ObjectId,
            ref: "books", //for refering so spelling matters
        }
    ],
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: "books",
    }
    ],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "order",
    }
    ],
},
{timestamps: true}
)

module.exports = mongoose.model("user",user);